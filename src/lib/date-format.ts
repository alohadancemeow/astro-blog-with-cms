export function formatDate(dateString: string) {
  const date = new Date(dateString); // Parse the input date string
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }; // Format options

  return date.toLocaleDateString("en-US", options); // Convert to desired format
}
