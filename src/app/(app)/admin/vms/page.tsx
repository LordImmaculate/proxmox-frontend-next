import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty";
import VMCard from "@/components/vm-card";
import { prisma } from "@/lib/prisma";
import { checkSession } from "@/lib/utils-server";
import { Computer } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import VMSearch from "./search";

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ user?: string; page?: string }>;
}) {
  const { user, page: pageParam } = await searchParams;
  const page = parseInt(pageParam || "1", 10) || 1;
  const pageSize = 12;

  const session = await checkSession();
  if (!session.success) redirect("/auth/signin");
  if (session.data.user.role !== "admin") redirect("/");

  const whereClause = user ? { userId: user } : undefined;

  const totalVms = await prisma.vm.count({
    where: whereClause
  });

  const totalPages = Math.ceil(totalVms / pageSize) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const vms = await prisma.vm.findMany({
    include: {
      user: { select: { name: true } }
    },
    where: whereClause,
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
    orderBy: { id: "asc" }
  });

  const users = await prisma.user.findMany({});

  const buildPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (user) params.set("user", user);
    params.set("page", String(pageNumber));
    return `/admin/vms?${params.toString()}`;
  };

  if (totalVms === 0)
    return (
      <div>
        <VMSearch users={users} />
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Computer />
            </EmptyMedia>
            <EmptyTitle>No VMs</EmptyTitle>
            <EmptyDescription>
              {user ? "This user " : "The server "} currently don&apos;t have
              any VMs {user ? "in their account" : "."}.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href="/vms/create">
              <Button>Create your first VM</Button>
            </Link>
          </EmptyContent>
        </Empty>
      </div>
    );

  return (
    <div className="flex w-full flex-col items-center gap-4 px-4">
      <VMSearch users={users} />
      <div className="flex w-full flex-wrap items-center justify-center gap-4">
        {vms.map((vm) => (
          <VMCard key={vm.id} vm={vm} ownerName={vm.user.name} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex w-full max-w-4xl flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-4 sm:flex-row">
        <span className="text-center text-xs font-medium text-muted-foreground sm:text-left">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {totalVms === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-foreground">
            {Math.min(totalVms, currentPage * pageSize)}
          </span>{" "}
          of <span className="font-semibold text-foreground">{totalVms}</span>{" "}
          VMs
        </span>

        <div className="flex items-center gap-2">
          {currentPage > 1 ? (
            <Button
              variant="outline"
              render={<Link href={buildPageUrl(currentPage - 1)} />}
            >
              Previous
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Previous
            </Button>
          )}

          <span className="px-2 text-xs font-medium text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages ? (
            <Button
              variant="outline"
              render={<Link href={buildPageUrl(currentPage + 1)} />}
            >
              Next
            </Button>
          ) : (
            <Button variant="outline" disabled>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
