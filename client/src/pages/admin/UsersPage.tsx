import { Button } from "@/components/ui/button";
import { Ban, Trash2, ShieldCheck } from "lucide-react";
import {useUsers} from "../../features/user/useUser.js"
import { useEffect } from "react";
import { toast } from "sonner";

const UsersPage = () => {

  // temporary mock users until backend ready

   const{users , getUsers,banUser,deleteUser} = useUsers()

   useEffect(()=>{
    getUsers()
   },[])


   const handleBan = async(id) => {
    const res = await banUser(id)
   if (res.success) toast.success(res.message)
   }

   const handleDelete = async(id) =>{
    const res = await deleteUser(id)
    if(res.success){
      toast.success("user Delete Successfully")
    }
   }

 
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Users</h2>
        <p className="text-sm text-muted-foreground">
          {users.length} registered users
        </p>
      </div>

      {/* Table */}
      <div className="bg-card border rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-muted/40 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>

              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-b hover:bg-muted/30 transition"
                >

                  {/* Name */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                        {u.name?.charAt(0)}
                      </div>

                      <span className="font-medium">{u.name}</span>

                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-muted-foreground">
                    {u.email}
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3">

                    <span
                      className={`px-2 py-1 text-xs rounded flex items-center gap-1 w-fit
                      ${
                        u.role === "admin"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {u.role === "admin" && (
                        <ShieldCheck className="w-3 h-3" />
                      )}

                      {u.role}

                    </span>

                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">

                    <button
                      
                      className={`px-2 py-1 text-xs rounded
                      ${
                        u.isBanUser
                          ? "bg-red-500/10 text-red-500"
                          : "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {u.isBanUser ? "Banned" : "Active"}
                    </button>

                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">

                      {u.role !== "admin" && (
                        <>
                          <Button
                          onClick={() => handleBan(u._id)}
                            variant="ghost"
                            size="icon"
                            className="text-yellow-500"
                          >
                            <Ban className="w-4 h-4" />
                          </Button>

                          <Button
                          onClick={()=> handleDelete(u._id)}
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
};

export default UsersPage;