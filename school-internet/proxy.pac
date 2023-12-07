// proxy.pac file for eduProxy
// For version: 1.3-18

function FindProxyForURL(url, host) {

	// Normalize the URL for pattern matching
	url = url.toLowerCase();
	host = host.toLowerCase();	

	// Send plain hostnames out directly
	if (isPlainHostName(host)) return "DIRECT";

	// Send requests for myself directly to myself
	if (shExpMatch(host, "eduproxy") || shExpMatch(host, "7219prx01") || shExpMatch(host, "7219prx01.services.education.vic.gov.au")) return "DIRECT";

	// Force requests for eduSTAR CDN through eduProxy, regardless of IP detection checks
	if (shExpMatch(host, "cdn.edustar.vic.edu.au")) return "PROXY 10.129.64.19:8080";

	// If the user has entered something that looks like an IP address, go direct
	reip = /^\d+\.\d+\.\d+\.\d+$/g;
	if (reip.test(host)) {
		if (isInNet(host, "10.0.0.0", "255.0.0.0") || isInNet(host, "192.168.0.0", "255.255.0.0")) return "DIRECT";
	}

	// Full hostname must have been entered - attempt DNS lookup and if destination host is on private IP, go direct
	var resolved_ip = dnsResolve(host);
	if (
		isInNet(resolved_ip, "10.0.0.0", "255.0.0.0") ||
		isInNet(resolved_ip, "172.16.0.0", "255.240.0.0") ||
		isInNet(resolved_ip, "192.168.0.0", "255.255.0.0") ||
		isInNet(resolved_ip, "127.0.0.0", "255.255.255.0")
	) return "DIRECT";


// Basic-mode proxy exclusion domain list was configured, but references a missing or empty ACL (id=29).  No config added.


	// Otherwise, use local eduProxy
	return "PROXY eduproxy.curric.lhsc.edu.vic.gov.au:8080";

} 
