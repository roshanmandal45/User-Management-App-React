import axios from "axios";

export const fetchUsers = async () => {
  try {
    const response = await axios.get("https://randomuser.me/api/?results=16");
    return response.data.results.map((u, index) => ({
      id: index + 1,
      first_name: u.name.first,
      last_name: u.name.last,
      email: u.email,
      avatar: u.picture.large,
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
