import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import useGetAllTasks from "@/hooks/queries/dashboard/widget/use-get-all-tasks";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

dayjs.extend(relativeTime);

export default function Tasks() {
  const { data: tasks } = useGetAllTasks();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Fulfill your daily task</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <CardContent className="p-0">
          <ul>
            {/* {TASK.map((task) => (
              <li
                key={task.id}
                className="my-6 flex items-center gap-2 text-sm font-semibold text-slate-700 first:mt-0 last:mb-0"
              >
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                {task.message}
              </li>
            ))} */}

            <li className="my-6 flex items-center gap-2 text-sm font-semibold text-slate-700 first:mt-0 last:mb-0">
              <div className="size-2 rounded-full bg-primary"></div>
              {tasks?.total_open_order} orders you need to ship.
            </li>

            <li className="my-6 flex items-center gap-2 text-sm font-semibold text-slate-700 first:mt-0 last:mb-0">
              <div className="size-2 rounded-full bg-primary"></div>
              You have {tasks?.unauthorize_count} unauthorize channel
              {tasks?.unauthorize_count && tasks?.unauthorize_count > 1 ? "s" : ""}.
              Please, reconnect it as soon as possible.
            </li>
          </ul>
        </CardContent>
      </CardContent>
    </Card>
  );
}
