/* eslint-disable @typescript-eslint/no-explicit-any */

/* 
    Next API: /api/user
    Desc: Insert User id and full_name after GoogleOAuth SignIn is success
*/
export async function insertUser(user: any) {
  try {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });

    // Parse the JSON response
    const data = await response.json();

    if (!response.ok) {
      console.error('Error inserting user:', data.error);
      throw new Error(data.error || 'Failed to insert user');
    }

    // Successful insert/upsert
    // console.log('User insert successfully:', data.data);`
    return data.data;
  } catch (error) {
    console.error('Error Insert User data from google auth: ', error);
    throw error;
  }
}
