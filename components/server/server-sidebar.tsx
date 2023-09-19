import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar = async ({serverId}: ServerSidebarProps) => {

  const profile = await currentProfile();

  const server = db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        }
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc"
        }
      }
    }
  })


  if(!server) {
    return redirect("/");
  }
  
  const allChannels = server?.channels;
  const allMembers = server?.members;

  let textChannels = [];
  let audioChannels = [];
  let videoChannels = [];
  let members = [];
  let role = MemberRole.GUEST;

  if(Array.isArray(allChannels)) {
    textChannels = allChannels.filter((channel) => channel.type === ChannelType.TEXT);
    audioChannels = allChannels.filter((channel) => channel.type === ChannelType.AUDIO);
    videoChannels = allChannels.filter((channel) => channel.type === ChannelType.VIDEO);
  }

  if(Array.isArray(allMembers)) {
    members = allMembers.filter((member) => member.profileId !== profile?.id);
    role = allMembers.find((member) => member.profileId === profile?.id)?.role;
  }


  if(!profile) {
    return redirect("/")
  }
  return (
      <div
        className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#f2f3f5]"
      >

      </div>
  )
}

export default ServerSidebar