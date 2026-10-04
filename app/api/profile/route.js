export async function GET() {
  const profile = {
    name: "Khalida Nurariafrina Putri", // ini namaku sendiri hehheehe
    role: "peserta bootcamp",
    favoriteTech: ["Next.js", "React", "Tailwind CSS", "Python"], 
  };
 
  return Response.json(profile);
}