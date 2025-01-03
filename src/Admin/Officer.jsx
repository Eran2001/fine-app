import { useEffect, useState } from "react";

const Officer = () => {
  const [officers, setOfficers] = useState([]);
  const [form, setForm] = useState({
    officer_id: "",
    batch_number: "",
    name: "",
    email: "",
    contact: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch officers
  const fetchOfficers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/officers");
      const data = await response.json();
      setOfficers(data);
    } catch (error) {
      console.error("Error fetching officers:", error);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:5000/api/officers/${editId}`
      : "http://localhost:5000/api/officers";
    const method = editId ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      fetchOfficers();
      setForm({
        officer_id: "",
        batch_number: "",
        name: "",
        position: "",
        contact: "",
      });
      setEditId(null);
    } catch (error) {
      console.error("Error saving officer:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/officers/${id}`, {
        method: "DELETE",
      });
      fetchOfficers();
    } catch (error) {
      console.error("Error deleting officer:", error);
    }
  };

  // Set form for edit
  const handleEdit = (officer) => {
    setForm({
      officer_id: officer.officer_id,
      batch_number: officer.batch_number,
      name: officer.name,
      position: officer.email,
      contact: officer.contact,
    });
    setEditId(officer.officer_id);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Officer List</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Officer_ID"
          value={form.officer_id}
          onChange={(e) => setForm({ ...form, officer_id: e.target.value })}
          required
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Batch_number"
          value={form.batch_number}
          onChange={(e) => setForm({ ...form, batch_number: e.target.value })}
          required
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="border px-2 py-1 mr-2"
        />
        <input
          type="text"
          placeholder="Contact"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          required
          className="border px-2 py-1 mr-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                OfficerID
              </th>
              <th className="px-2 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                Batch_Number
              </th>
              <th className="px-10 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-medium text-gray-600 tracking-wider">
                Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr key={officer.officer_id}>
                <td className="px-6 py-3 border-b">{officer.officer_id}</td>
                <td className="px-6 py-3 border-b">{officer.batch_number}</td>
                <td className="px-6 py-3 border-b">{officer.name}</td>
                <td className="px-6 py-3 border-b">{officer.email}</td>
                <td className="px-6 py-3 border-b">{officer.contact}</td>
                <td className="px-6 py-3 border-b">
                  <button
                    onClick={() => handleEdit(officer)}
                    className="px-2 py-1 text-white bg-yellow-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(officer.officer_id)}
                    className="px-2 py-1 text-white bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Officer;
