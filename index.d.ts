/**
 *
 * @returns {boolean}
 * @param ipAddress
 * @param ipList
 */
declare function verifyCIDRList(
  ipAddress: string,
  ipList: string | string[]
): boolean;

declare namespace verifyCIDRList {}

declare module "ip-range-check" {
  export = verifyCIDRList;
}
