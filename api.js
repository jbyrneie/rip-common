import { sql } from '@vercel/postgres'
import { decode } from 'html-entities'

export async function getNoticeById(noticeId) {
  const query = `SELECT
                    N.NOTICE_ID,
                    N.FIRST_NAME,
                    N.LAST_NAME,
                    CONCAT(N.FIRST_NAME, ' ', N.LAST_NAME) as NAME,
                    N.LOCATION,
                    N.DECEASED_DATE_UTC,
                    N.DETAILS,
                    N.USER_ID,
                    N.CLIENT_ID,
                    N.IMAGE_URL,
                    R.REGION_NAME,
                    R.REGION_ID
                  FROM NOTICES N
                  JOIN REGIONS R on R.REGION_ID = N.REGION_ID
                  WHERE NOTICE_ID = ${noticeId}
                  LIMIT 1
                  `
  console.log(query)
  const result = await sql.query(query)
  console.log(`result: ${JSON.stringify(result)}`)

  let noticeDetails = result && result.rows ? result.rows[0] : null
  if (!noticeDetails) {
    throw `No noticedetails available for ${noticeId}`
  }

  noticeDetails.first_name = decode(noticeDetails.first_name)
  noticeDetails.last_name = decode(noticeDetails.last_name)
  noticeDetails.name = decode(noticeDetails.name)
  noticeDetails.location = decode(noticeDetails.location)
  noticeDetails.details = decode(noticeDetails.details)

  return noticeDetails
}
