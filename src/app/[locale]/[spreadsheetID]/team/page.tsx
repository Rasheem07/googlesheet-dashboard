/* eslint-disable react/jsx-key */
"use client";
import { Button } from "@/components/ui/button";
import { useTable, Column } from "react-table"; // Correct React Table imports
import React from "react";

// Define the type for your data
type TeamMember = {
  name: string;
  email: string;
  role: string;
  status: string;
};

export default function TeamPage() {
  return (
    <div className="space-y-8 p-8">
      <TeamOverview />
      <TeamMembers />
    </div>
  );
}

function TeamOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-sidebar shadow-lg rounded-lg p-6">
      <div className="flex flex-col items-center justify-center gap-y-2 py-6">
        <label className="text-lg font-semibold text-gray-600 dark:text-gray-400">
          Team name
        </label>
        <h1 className="text-3xl font-bold text-primary dark:text-primary">
          Al-Nubras
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2 py-6">
        <label className="text-lg font-semibold text-gray-600 dark:text-gray-400">
          Team lead
        </label>
        <h1 className="text-3xl font-bold text-primary dark:text-primary">
          Raneez
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2 py-6">
        <label className="text-lg font-semibold text-gray-600 dark:text-gray-400">
          Total members
        </label>
        <h1 className="text-3xl font-bold text-primary dark:text-primary">
          10
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2 py-6">
        <label className="text-lg font-semibold text-gray-600 dark:text-gray-400">
          Active
        </label>
        <h1 className="text-3xl font-bold text-emerald-400">4</h1>
      </div>
    </div>
  );
}

function TeamMembers() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = React.useState<TeamMember[]>([
    {
      name: "Alice",
      email: "alice@email.com",
      role: "Developer",
      status: "Active",
    },
    {
      name: "Bob",
      email: "bob@email.com",
      role: "Designer",
      status: "Inactive",
    },
    {
      name: "Charlie",
      email: "charlie@email.com",
      role: "Manager",
      status: "Active",
    },
    { name: "David", email: "david@email.com", role: "QA", status: "Active" },
  ]);

  // Define columns with the correct accessor types matching the data keys
  const columns: Column<TeamMember>[] = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      { Header: "Status", accessor: "status" },
      {
        Header: "Actions", // New column for the role change button
        id: "actions", // Set an id for the column
        Cell: () => {
          return (
            <div className="flex items-center h-full">
              <Button
                variant="ghost"
                className="border border-gray-300 px-4 py-2 text-sm"
              >
                Change Role
              </Button>
            </div>
          );
        },
      },
    ],
    [] // Add data dependency so the table updates when roles change
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="space-y-6 bg-sidebar shadow-lg rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary dark:text-primary">
          Team Members
        </h1>
        <div className="flex items-center gap-x-4">
          <Button variant="secondary">Invite a member</Button>
          <Button className="bg-blue-500 dark:bg-blue-600 text-white">
            Add member
          </Button>
        </div>
      </div>
      <div className="w-full py-3">
        <input
          className="w-full py-2 px-4 text-base  placeholder:text-zinc-500 rounded-md bg-transparent ring-2 ring-gray-300 focus:ring-blue-600 outline-none "
          placeholder="Search for a team member..."
        />
      </div>

      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full table-auto border-collapse"
        >
          <thead>
            {headerGroups.map((headerGroup, i) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 border-b"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b hover:bg-accent"
                  key={i}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-8 text-sm text-gray-700 dark:text-gray-200"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
