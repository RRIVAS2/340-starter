const pool = require("../database/")


/* *****************************
*   Create a support ticket
* *************************** */
async function createSupportTicket(ticket_subject, ticket_description, account_id ){
  try {
    const sql = "INSERT INTO support_tickets (ticket_subject, ticket_description, account_id) VALUES ($1, $2, $3) RETURNING *"
    return await pool.query(sql, [ticket_subject, ticket_description, account_id ])
  } catch (error) {
    return error.message
  }
}

/* ***************************
 *  Get all tickets
 * ************************** */

async function getAllTickets() {
    return await pool.query("SELECT * FROM public.support_tickets ORDER BY created_at DESC")
}

/* *****************************
* Return account data using account ID
* ***************************** */
async function getTicketsByAccountId (account_id) {
  try {
    const result = await pool.query(
      'SELECT * FROM public.support_tickets WHERE account_id = $1',
      [account_id])
    return result.rows
  } catch (error) {
    return new Error("No matching account ID found")
  }
}


module.exports = { createSupportTicket, getAllTickets, getTicketsByAccountId }