const [error, setError] = useState("");

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }
      return response.json();
    })
    .then((data) => {
      setUsers(data);
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
}, []);

if (error) { 
    return <p>Error: {error}</p>; 
}