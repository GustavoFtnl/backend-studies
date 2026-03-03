export function deleteTicket({ request, response, database }) {
  const { id } = request.params;

  database.deleteTicket("tickets", id);

  return response.end();
}
