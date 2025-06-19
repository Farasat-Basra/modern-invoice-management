export interface Invoice {
  id: string
  clientName: string
  total: number
  date: string
  pdfData: number[]
}

const STORAGE_KEY = "invoice-generator-invoices"

export function saveInvoice(invoice: Invoice): void {
  try {
    const existingInvoices = getInvoices()
    const updatedInvoices = [invoice, ...existingInvoices]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInvoices))
  } catch (error) {
    console.error("Error saving invoice to localStorage:", error)
  }
}

export function getInvoices(): Invoice[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error retrieving invoices from localStorage:", error)
    return []
  }
}

export function deleteInvoice(id: string): void {
  try {
    const existingInvoices = getInvoices()
    const updatedInvoices = existingInvoices.filter((invoice) => invoice.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedInvoices))
  } catch (error) {
    console.error("Error deleting invoice from localStorage:", error)
  }
}
