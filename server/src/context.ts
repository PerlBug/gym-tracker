import { getConnection } from "./database/Provider";
import { IContextType } from "./types";
import { getAuthPayload } from "./utils/auth";

/**
 * @description holds context for Apollo Server
 */

export const context = async ({req,res}): Promise<IContextType> => {
  let payload = await getAuthPayload(req);
  const dbConn = await getConnection();
  return { dbConn,req,res, payload };
}