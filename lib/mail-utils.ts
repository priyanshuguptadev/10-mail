import { format, formatDistanceToNow } from "date-fns"

export interface ParsedSender {
  name: string
  email: string
}

export function parseFrom(from: string): ParsedSender {
  if (!from) {
    return { name: "Unknown", email: "" }
  }

  // Handle patterns like: "John Doe" <john@example.com> or John Doe <john@example.com>
  const angleMatch = from.match(/^(.*?)(?:<([^>]+)>)?$/)
  let name = ""
  let email = ""

  if (angleMatch && angleMatch[2]) {
    email = angleMatch[2].trim()
    name = angleMatch[1] ? angleMatch[1].trim().replace(/^["']|["']$/g, "") : ""
  } else if (from.includes("@")) {
    email = from.trim()
  } else {
    name = from.trim()
  }

  if (!name && email) {
    const local = email.split("@")[0] || ""
    const parts = local.split(/[._-]/).filter(Boolean)
    if (parts.length > 0) {
      name = parts
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ")
    } else {
      name = email
    }
  }

  return {
    name: name || "Unknown",
    email: email || from,
  }
}

export function getInitials(name: string, email?: string): string {
  const clean = name.replace(/^[^a-zA-Z0-9]+/, "").trim()
  const parts = clean.split(/\s+/).filter(Boolean)
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  if (parts.length === 1 && parts[0].length === 1) {
    return parts[0].toUpperCase()
  }
  if (email) {
    const local = email.split("@")[0].replace(/^[^a-zA-Z0-9]+/, "")
    return local.slice(0, 2).toUpperCase() || "EM"
  }
  return "EM"
}

export function formatMailDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  if (isNaN(d.getTime())) return ""
  return format(d, "MMM d, yyyy, h:mm:ss a")
}

export function formatMailRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  if (isNaN(d.getTime())) return ""
  return formatDistanceToNow(d, { addSuffix: true })
}
