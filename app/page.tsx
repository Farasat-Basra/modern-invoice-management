"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Clock, Shield, Zap, CheckCircle, ArrowRight, Star, Users, TrendingUp } from "lucide-react"
import InvoiceApp from "@/components/invoice-app"

export default function LandingPage() {
  const [showApp, setShowApp] = useState(false)

  if (showApp) {
    return <InvoiceApp onBack={() => setShowApp(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-600 text-white p-2 rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">InvoicePro</h1>
              </div>
            </div>
            <Button onClick={() => setShowApp(true)} className="bg-purple-600 hover:bg-purple-700">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
            ✨ Professional Invoice Generator
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Create Professional
            <span className="text-purple-600 block">Invoices Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Generate beautiful, professional invoices in seconds. No signup required, no monthly fees. Just clean,
            simple invoicing that works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setShowApp(true)}
              className="bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3"
            >
              Start Creating Invoices
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Invoices Generated</p>
            </div>
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">99.9%</h3>
              <p className="text-gray-600">Uptime Reliability</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.9/5</h3>
              <p className="text-gray-600">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to invoice professionally</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make invoicing simple, fast, and professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>Create and download professional invoices in under 30 seconds</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle>PDF Generation</CardTitle>
                <CardDescription>High-quality PDF invoices ready for email or printing</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-violet-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-violet-600" />
                </div>
                <CardTitle>Invoice History</CardTitle>
                <CardDescription>Keep track of all your invoices with built-in history management</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>Your data stays on your device. No cloud storage, complete privacy</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-rose-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-rose-600" />
                </div>
                <CardTitle>Professional Design</CardTitle>
                <CardDescription>Clean, modern invoice templates that look great every time</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-teal-600" />
                </div>
                <CardTitle>No Registration</CardTitle>
                <CardDescription>Start using immediately. No accounts, no passwords, no hassle</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-violet-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">Three simple steps to professional invoices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enter Details</h3>
              <p className="text-gray-600">Add your client information and itemized services or products</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Generate PDF</h3>
              <p className="text-gray-600">Click generate and get a professional PDF invoice instantly</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Send & Track</h3>
              <p className="text-gray-600">Download, email to clients, and track in your invoice history</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-violet-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to create your first invoice?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust InvoicePro for their invoicing needs.
          </p>
          <Button
            size="lg"
            onClick={() => setShowApp(true)}
            className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Start Creating Invoices Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-purple-600 text-white p-2 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold">InvoicePro</span>
            </div>
            <div className="text-gray-400 text-sm">© 2024 InvoicePro. Professional invoicing made simple.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
