"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Download, FileText, ArrowLeft } from "lucide-react"
import { generateInvoicePDF } from "@/lib/pdf-generator"
import { saveInvoice, getInvoices, type Invoice } from "@/lib/storage"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

interface InvoiceData {
  clientName: string
  clientEmail: string
  clientAddress: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  notes: string
}

interface InvoiceAppProps {
  onBack: () => void
}

export default function InvoiceApp({ onBack }: InvoiceAppProps) {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [{ id: "1", description: "", quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: "",
  })

  const [invoiceHistory, setInvoiceHistory] = useState<Invoice[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    const existingInvoices = getInvoices()
    if (existingInvoices.length === 0) {
      // Add sample invoices for demonstration
      const sampleInvoices = [
        {
          id: "INV-2024001",
          clientName: "Acme Corporation",
          total: 2450.0,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          pdfData: [],
        },
        {
          id: "INV-2024002",
          clientName: "Tech Solutions Ltd",
          total: 1875.5,
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          pdfData: [],
        },
        {
          id: "INV-2024003",
          clientName: "Creative Agency Inc",
          total: 3200.75,
          date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
          pdfData: [],
        },
      ]

      sampleInvoices.forEach((invoice) => saveInvoice(invoice))
      setInvoiceHistory(getInvoices())
    } else {
      setInvoiceHistory(existingInvoices)
    }
  }, [])

  useEffect(() => {
    calculateTotals()
  }, [invoiceData.items])

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.amount, 0)
    const tax = subtotal * 0.1 // 10% tax
    const total = subtotal + tax

    setInvoiceData((prev) => ({
      ...prev,
      subtotal,
      tax,
      total,
    }))
  }

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))
  }

  const removeItem = (id: string) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === "quantity" || field === "rate") {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }
          return updatedItem
        }
        return item
      }),
    }))
  }

  const generatePDF = async () => {
    setIsGenerating(true)
    try {
      const invoiceNumber = `INV-${Date.now()}`
      const pdfBytes = await generateInvoicePDF({
        ...invoiceData,
        invoiceNumber,
        date: new Date().toLocaleDateString(),
      })

      // Save to localStorage
      const invoice: Invoice = {
        id: invoiceNumber,
        clientName: invoiceData.clientName,
        total: invoiceData.total,
        date: new Date().toISOString(),
        pdfData: Array.from(pdfBytes),
      }

      saveInvoice(invoice)
      setInvoiceHistory(getInvoices())

      // Download PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${invoiceNumber}.pdf`
      a.click()
      URL.revokeObjectURL(url)

      // Reset form
      setInvoiceData({
        clientName: "",
        clientEmail: "",
        clientAddress: "",
        items: [{ id: "1", description: "", quantity: 1, rate: 0, amount: 0 }],
        subtotal: 0,
        tax: 0,
        total: 0,
        notes: "",
      })
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadInvoice = (invoice: Invoice) => {
    if (invoice.pdfData.length === 0) {
      alert("This is a sample invoice. PDF data is not available for download.")
      return
    }

    const pdfBytes = new Uint8Array(invoice.pdfData)
    const blob = new Blob([pdfBytes], { type: "application/pdf" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${invoice.id}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <header className="bg-white border-b border-gray-200 mb-8">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2 hover:bg-purple-50">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="bg-purple-600 text-white p-2 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">InvoicePro</h1>
                <p className="text-sm text-gray-600">Professional invoice management made simple</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Version 1.0</p>
              <p className="text-xs text-gray-400">Invoice Generator</p>
            </div>
          </div>
        </div>
      </header>

      <Tabs defaultValue="create" className="space-y-6">
        <TabsList>
          <TabsTrigger value="create">Create Invoice</TabsTrigger>
          <TabsTrigger value="history">Invoice History</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
              <CardDescription>Enter your client's details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={invoiceData.clientName}
                    onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientName: e.target.value }))}
                    placeholder="Enter client name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={invoiceData.clientEmail}
                    onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientEmail: e.target.value }))}
                    placeholder="Enter client email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientAddress">Client Address</Label>
                <Textarea
                  id="clientAddress"
                  value={invoiceData.clientAddress}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientAddress: e.target.value }))}
                  placeholder="Enter client address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Items</CardTitle>
              <CardDescription>Add items to your invoice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoiceData.items.map((item, index) => (
                  <div key={item.id} className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-5">
                      <Label htmlFor={`description-${item.id}`}>Description</Label>
                      <Input
                        id={`description-${item.id}`}
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Item description"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor={`rate-${item.id}`}>Rate ($)</Label>
                      <Input
                        id={`rate-${item.id}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) => updateItem(item.id, "rate", Number.parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Amount</Label>
                      <div className="text-lg font-semibold">${item.amount.toFixed(2)}</div>
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={invoiceData.items.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button onClick={addItem} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <div className="mt-6 space-y-2 max-w-sm ml-auto">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${invoiceData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%):</span>
                  <span>${invoiceData.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${invoiceData.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any additional notes or terms..."
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={generatePDF}
              disabled={!invoiceData.clientName || invoiceData.items.length === 0 || isGenerating}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate & Download PDF"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>View and download your previous invoices</CardDescription>
            </CardHeader>
            <CardContent>
              {invoiceHistory.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No invoices generated yet. Create your first invoice to see it here.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoiceHistory.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.clientName}</TableCell>
                        <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                        <TableCell>${invoice.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => downloadInvoice(invoice)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
