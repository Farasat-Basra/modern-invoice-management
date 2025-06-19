import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

interface InvoiceData {
  invoiceNumber: string
  date: string
  clientName: string
  clientEmail: string
  clientAddress: string
  items: Array<{
    description: string
    quantity: number
    rate: number
    amount: number
  }>
  subtotal: number
  tax: number
  total: number
  notes: string
}

export async function generateInvoicePDF(data: InvoiceData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([612, 792]) // Letter size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const { width, height } = page.getSize()
  const margin = 50
  let yPosition = height - margin

  // Company Header with Purple Branding
  page.drawText("ACME CORPORATION", {
    x: margin,
    y: yPosition,
    size: 24,
    font: boldFont,
    color: rgb(0.45, 0.2, 0.6), // Purple color
  })

  yPosition -= 25
  page.drawText("123 Business Street", {
    x: margin,
    y: yPosition,
    size: 12,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  })

  yPosition -= 15
  page.drawText("Business City, BC 12345", {
    x: margin,
    y: yPosition,
    size: 12,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  })

  yPosition -= 15
  page.drawText("contact@acmecorp.com | (555) 123-4567", {
    x: margin,
    y: yPosition,
    size: 12,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  })

  // Invoice Title and Number with Purple Accent
  yPosition -= 50
  page.drawText("INVOICE", {
    x: width - margin - 100,
    y: yPosition + 20,
    size: 28,
    font: boldFont,
    color: rgb(0.45, 0.2, 0.6), // Purple color
  })

  page.drawText(`Invoice #: ${data.invoiceNumber}`, {
    x: width - margin - 150,
    y: yPosition - 5,
    size: 12,
    font: font,
  })

  page.drawText(`Date: ${data.date}`, {
    x: width - margin - 150,
    y: yPosition - 20,
    size: 12,
    font: font,
  })

  // Client Information
  yPosition -= 60
  page.drawText("Bill To:", {
    x: margin,
    y: yPosition,
    size: 14,
    font: boldFont,
  })

  yPosition -= 20
  page.drawText(data.clientName, {
    x: margin,
    y: yPosition,
    size: 12,
    font: font,
  })

  if (data.clientEmail) {
    yPosition -= 15
    page.drawText(data.clientEmail, {
      x: margin,
      y: yPosition,
      size: 12,
      font: font,
    })
  }

  if (data.clientAddress) {
    const addressLines = data.clientAddress.split("\n")
    for (const line of addressLines) {
      yPosition -= 15
      page.drawText(line, {
        x: margin,
        y: yPosition,
        size: 12,
        font: font,
      })
    }
  }

  // Items Table with Purple Header
  yPosition -= 50
  const tableTop = yPosition
  const tableHeaders = ["Description", "Qty", "Rate", "Amount"]
  const columnWidths = [300, 60, 80, 80]
  const columnPositions = [margin, margin + 300, margin + 360, margin + 440]

  // Table Header with Purple Background
  page.drawRectangle({
    x: margin,
    y: yPosition - 20,
    width: width - 2 * margin,
    height: 25,
    color: rgb(0.45, 0.2, 0.6), // Purple background
  })

  tableHeaders.forEach((header, index) => {
    page.drawText(header, {
      x: columnPositions[index],
      y: yPosition - 10,
      size: 12,
      font: boldFont,
      color: rgb(1, 1, 1), // White text on purple background
    })
  })

  yPosition -= 35

  // Table Rows
  data.items.forEach((item, index) => {
    if (index % 2 === 0) {
      page.drawRectangle({
        x: margin,
        y: yPosition - 15,
        width: width - 2 * margin,
        height: 20,
        color: rgb(0.98, 0.98, 0.98),
      })
    }

    page.drawText(item.description, {
      x: columnPositions[0],
      y: yPosition - 5,
      size: 10,
      font: font,
    })

    page.drawText(item.quantity.toString(), {
      x: columnPositions[1],
      y: yPosition - 5,
      size: 10,
      font: font,
    })

    page.drawText(`$${item.rate.toFixed(2)}`, {
      x: columnPositions[2],
      y: yPosition - 5,
      size: 10,
      font: font,
    })

    page.drawText(`$${item.amount.toFixed(2)}`, {
      x: columnPositions[3],
      y: yPosition - 5,
      size: 10,
      font: font,
    })

    yPosition -= 25
  })

  // Totals
  yPosition -= 20
  const totalsX = width - margin - 150

  page.drawText(`Subtotal: $${data.subtotal.toFixed(2)}`, {
    x: totalsX,
    y: yPosition,
    size: 12,
    font: font,
  })

  yPosition -= 20
  page.drawText(`Tax: $${data.tax.toFixed(2)}`, {
    x: totalsX,
    y: yPosition,
    size: 12,
    font: font,
  })

  yPosition -= 25
  page.drawRectangle({
    x: totalsX - 10,
    y: yPosition - 15,
    width: 160,
    height: 25,
    color: rgb(0.45, 0.2, 0.6), // Purple background for total
  })

  page.drawText(`Total: $${data.total.toFixed(2)}`, {
    x: totalsX,
    y: yPosition - 5,
    size: 14,
    font: boldFont,
    color: rgb(1, 1, 1), // White text on purple background
  })

  // Notes
  if (data.notes) {
    yPosition -= 60
    page.drawText("Notes:", {
      x: margin,
      y: yPosition,
      size: 12,
      font: boldFont,
    })

    yPosition -= 20
    const noteLines = data.notes.split("\n")
    for (const line of noteLines) {
      page.drawText(line, {
        x: margin,
        y: yPosition,
        size: 10,
        font: font,
      })
      yPosition -= 15
    }
  }

  // Footer
  page.drawText("Thank you for your business!", {
    x: margin,
    y: 50,
    size: 12,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  })

  return await pdfDoc.save()
}
