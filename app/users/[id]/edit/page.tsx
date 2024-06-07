import EditUserForm from "@/components/EditUserForm";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function EditUserPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <Heading>Edit your profile</Heading>
      <div className=" text-green mb-2">
        <Link className="underline" href={`/users/${params.id}`}>
          Go back
        </Link>
      </div>
      <EditUserForm params={params} />
    </div>
  );
}
