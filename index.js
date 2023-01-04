

const ipaddr = require("ipaddr.js");

/**
 * Verify CIDR IP list
 * @param ipAddress {String} IP address
 * @param ipList {String|[String]} IPs to compare
 * @returns {*|boolean|boolean}
 */
function verifyCIDRList(ipAddress = '', ipList = '') {

    if (!Array.isArray(ipList)) return verifyCIDR(ipAddress, ipList);

    let isValid = false;
    for (let i = 0; i < ipList.length; i++) {
        if (verifyCIDR(ipAddress, ipList[i])) {
            isValid = true;
            break;
        }
    }
    return isValid;
}

/**
 * Compare individual IP
 * @param ipAddress {String} IP address
 * @param cidr {String} IP to compare
 * @returns {boolean}
 */
function verifyCIDR(ipAddress = '', cidr = '') {

    try {
        const parsedIpAddress = ipaddr.parse(ipAddress);

        if (cidr.includes('/')) {
            const ip = ipaddr.parseCIDR(cidr);
            return parsedIpAddress.match(ip);
        }

        const cidrAsIp = ipaddr.parse(cidr);
        if ((parsedIpAddress.kind() === 'ipv6') && (cidrAsIp.kind() === 'ipv6')) return parsedIpAddress.toNormalizedString() === cidrAsIp.toNormalizedString();
        return parsedIpAddress.toString() === cidrAsIp.toString();
    }
    catch (error) {
        if (process.env.NODE_ENV !== 'production') console.error(error);
        return false;
    }
}

module.exports = verifyCIDRList;
