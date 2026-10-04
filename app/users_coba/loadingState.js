const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      setUsers(data);
      setLoading(false);
    });
}, []);


if (loading) {
  return <p>Loading...</p>;
}