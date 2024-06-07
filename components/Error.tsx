export default function Error({ error }: { error: string | null }) {
  return (
    <p className="text-center text-red-600 font-bold">
      Sorry something went wrong <br />
      {error}
    </p>
  );
}
