import UserInfo from "@/components/UserInfo";

export default function UserPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <UserInfo id={params.id} />
    </div>
  );
}
