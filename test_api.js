import axios from "axios";

const fetchUsers = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log("Status:", response.status);
    console.log("Data length:", response.data.length);
    const users = response.data.map((u) => {
      const names = u.name.split(" ");
      const firstName = names[0] || u.name;
      const lastName = names.slice(1).join(" ") || "";
      return {
        id: u.id,
        first_name: firstName,
        last_name: lastName,
        email: u.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random&color=fff`,
      };
    });
    console.log("Mapped users:", users.slice(0, 1));

  } catch (error) {
    console.error("Error fetching users:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
    }
  }
};

fetchUsers();
