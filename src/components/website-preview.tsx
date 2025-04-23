"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Globe, Pencil } from "lucide-react"

export default function WebsitePreview() {
    const [activeTab, setActiveTab] = useState("preview")

    return (
        <Card className="w-full h-[600px] flex flex-col">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Your Generated Website</span>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                        <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button size="sm">
                            <Globe className="h-4 w-4 mr-2" />
                            Publish
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
                    <TabsList className="mb-4">
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="code">Code</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="border rounded-md flex-1 overflow-hidden">
                        <iframe
                            src="/placeholder.svg?height=400&width=800&text=Website+Preview"
                            className="w-full h-full"
                            title="Website Preview"
                        />
                    </TabsContent>
                    <TabsContent value="code" className="flex-1 overflow-hidden">
            <pre className="bg-muted text-muted-foreground p-4 rounded-md overflow-auto h-full text-sm">
              {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Generated Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <div class="logo">Your Brand</div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="home" class="hero">
      <h1>Welcome to Your Brand</h1>
      <p>Your compelling tagline goes here</p>
      <button>Learn More</button>
    </section>
    
    <!-- More sections would be here -->
  </main>
  
  <footer>
    <p>&copy; 2023 Your Brand. All rights reserved.</p>
  </footer>
</body>
</html>`}
            </pre>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="bg-muted/20 border-t">
                <p className="text-sm text-muted-foreground">
                    This is a preview of your generated website. You can edit, export, or publish it using the buttons above.
                </p>
            </CardFooter>
        </Card>
    )
}
