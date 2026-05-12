const BASE_URL =
  'https://69fd04d630ad0a6fd1c06910.mockapi.io/Tables';

export async function getTables() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch tables');
  }

  return response.json();
}

export async function createBooking(data: any) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create booking');
  }

  return response.json();
}
export const deleteBooking = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }
};