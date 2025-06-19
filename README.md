# InvoicePro - Professional Invoice Generator

A modern, frontend-only invoice generator built with Next.js that allows users to create, manage, and download professional PDF invoices without requiring any backend infrastructure.

##  Features

### Core Functionality
- **Invoice Creation**: Intuitive form interface for client information and itemized billing
- **PDF Generation**: High-quality PDF invoices using pdf-lib with professional formatting
- **Local Storage**: All data stored locally in browser - no cloud dependency
- **Invoice History**: Complete history management with re-download capabilities
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### User Experience
- **Landing Page**: Professional marketing page with feature highlights
- **No Registration**: Start using immediately without accounts or passwords
- **Real-time Calculations**: Automatic subtotal, tax, and total calculations
- **Sample Data**: Pre-loaded sample invoices for demonstration
- **Clean UI**: Modern purple-themed design with Tailwind CSS

### Technical Features
- **Frontend Only**: Pure client-side application with no backend requirements
- **PDF Library**: Uses pdf-lib for browser-based PDF generation
- **TypeScript**: Fully typed for better development experience
- **Component Architecture**: Modular React components with shadcn/ui
- **Local Persistence**: localStorage for invoice data and PDF storage

##  Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **PDF Generation**: pdf-lib
- **Icons**: Lucide React
- **Storage**: Browser localStorage

##  Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/invoicepro.git
cd invoicepro
```

2. Install dependencies:


```shellscript
npm install
```

3. Run the development server:


```shellscript
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser


##  Project Structure

```plaintext
├── app/
│   ├── page.tsx                 # Landing page component
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── invoice-app.tsx         # Main invoice application
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── pdf-generator.ts        # PDF generation logic
│   ├── storage.ts              # localStorage utilities
│   └── utils.ts                # Utility functions
└── public/                     # Static assets
```

## Design System

### Color Palette

- **Primary**: Purple (`#7C3AED`)
- **Secondary**: Violet, Emerald, Rose accents
- **Neutral**: Gray scale for text and backgrounds
- **Modern**: Gradient backgrounds and subtle shadows


### Components

- Professional invoice templates
- Responsive form layouts
- Interactive data tables
- Modern card-based design
- Smooth transitions and hover effects


## 📋 Usage

### Creating an Invoice

1. Navigate to the "Create Invoice" tab
2. Fill in client information (name, email, address)
3. Add itemized services/products with quantities and rates
4. Add optional notes or terms
5. Click "Generate & Download PDF"


### Managing Invoice History

1. Switch to "Invoice History" tab
2. View all previously generated invoices
3. Re-download any invoice PDF
4. Track client payments and invoice status


### PDF Features

- Professional company branding
- Itemized billing table
- Automatic tax calculations
- Custom notes section
- Print-ready formatting


## Configuration

### Company Information

Update company details in `lib/pdf-generator.ts`:
```bash
// Company Header
page.drawText("YOUR COMPANY NAME", {
  // styling options
})
```

### Tax Rate

Modify tax calculation in `components/invoice-app.tsx`:
```bash
const tax = subtotal * 0.1 // Change 0.1 to your tax rate
```
##  Key Benefits

- **No Backend Required**: Deploy anywhere static hosting is available
- **Privacy First**: All data stays on user's device
- **Professional Output**: High-quality PDF invoices
- **Cost Effective**: No subscription fees or usage limits
- **Easy Deployment**: Single-page application deployment
- **Modern UX**: Intuitive interface with professional design


## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy the .next folder
```
### Static Export
```bash
npm run build
npm run export
# Deploy the out/ folder
```

### ## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### ## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### ## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### ## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [pdf-lib](https://pdf-lib.js.org/) for PDF generation
- [Lucide](https://lucide.dev/) for icons

### ## 📞 Support

For support, please open an issue on GitHub or contact chfrasatbasra@gmail.com .
