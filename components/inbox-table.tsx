import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export interface EmailItem {
  id: string
  from: string
  subject: string
  text?: string
  date: string
  avatar?: string
}

function getInitials(from: string): string {
  const clean = from.replace(/^[^a-zA-Z0-9]+/, "")
  const parts = clean.split("@")[0].split(/[._-]/)
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return clean.slice(0, 2).toUpperCase() || "EM"
}

interface InboxTableProps {
  emails?: EmailItem[]
}

export function InboxTable({ emails = [] }: InboxTableProps) {
  return (
    <div className="rounded-md border bg-card text-card-foreground">
      <Table>
        <TableBody>
          {emails.map((email) => (
            <TableRow key={email.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="w-[48px] py-3 pl-4 pr-0">
                <Avatar className="size-8">
                  {email.avatar && <AvatarImage src={email.avatar} alt={email.from} />}
                  <AvatarFallback className="text-xs font-medium">
                    {getInitials(email.from)}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-foreground py-3 pr-4 md:pr-2 md:w-[220px] md:max-w-[220px] truncate">
                {email.from}
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground py-3 truncate max-w-[500px]">
                {email.subject}
              </TableCell>
              <TableCell className="hidden md:table-cell text-right text-xs text-muted-foreground whitespace-nowrap py-3 pr-4 w-[120px]">
                {email.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default InboxTable
