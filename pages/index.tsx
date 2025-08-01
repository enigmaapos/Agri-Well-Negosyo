import React from 'react'; import { Button } from '@/components/ui/button'; import { Card, CardContent } from '@/components/ui/card'; import { Input } from '@/components/ui/input'; import { Textarea } from '@/components/ui/textarea';

export default function Home() { return ( <main className="min-h-screen bg-gradient-to-br from-green-100 to-white text-gray-800"> <section className="py-12 px-6 text-center"> <h1 className="text-4xl md:text-6xl font-bold text-green-700 mb-4"> Welcome to Agri-Well Negosyo </h1> <p className="text-lg md:text-xl max-w-2xl mx-auto"> Grow your income and your health with our integrated agriculture and wellness business. </p> <Button className="mt-6 px-8 py-4 text-lg">Join Now</Button> </section>

<section className="py-12 px-6 bg-white">
    <h2 className="text-3xl font-bold text-center text-green-600 mb-8">What is Agri-Well Negosyo?</h2>
    <div className="max-w-4xl mx-auto text-center text-gray-700">
      <p className="mb-4">
        Agri-Well Negosyo combines sustainable agriculture with holistic wellness products. We offer organic produce, natural remedies, and an opportunity to earn through our negosyo kits.
      </p>
      <p>
        Whether you're a farmer, homemaker, or health advocate — this negosyo is for YOU.
      </p>
    </div>
  </section>

  <section className="py-12 px-6 bg-green-50">
    <h2 className="text-3xl font-bold text-center text-green-700 mb-10">How to Join</h2>
    <div className="max-w-3xl mx-auto grid gap-4">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Step 1: Register</h3>
          <p>Fill out your details in the form below.</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Step 2: Choose a Package</h3>
          <p>Select an Agri or Wellness starter kit to begin.</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-green-600 mb-2">Step 3: Start Your Journey</h3>
          <p>Start growing, selling, and promoting a healthy lifestyle!</p>
        </CardContent>
      </Card>
    </div>
  </section>

  <section className="py-12 px-6 bg-white">
    <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Registration Form</h2>
    <form className="max-w-xl mx-auto grid gap-4 bg-green-100 p-6 rounded-xl shadow">
      <Input placeholder="Full Name" required />
      <Input placeholder="Contact Number" required />
      <Input placeholder="Email Address" type="email" required />
      <Input placeholder="City / Province" required />
      <Textarea placeholder="Why do you want to join Agri-Well Negosyo?" rows={4} />
      <Button type="submit" className="mt-2">Submit Application</Button>
    </form>
  </section>

  <footer className="text-center py-8 text-sm text-gray-600">
    &copy; 2025 Agri-Well Negosyo. All rights reserved.
  </footer>
</main>

); }

