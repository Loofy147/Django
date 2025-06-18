"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FrameworkOverview from "@/docs/framework-overview"
import PracticalExamples from "@/docs/practical-examples"
import ExtensionGuide from "@/docs/extension-guide"

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Framework Overview</TabsTrigger>
            <TabsTrigger value="examples">Practical Examples</TabsTrigger>
            <TabsTrigger value="extensions">Extension Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <FrameworkOverview />
          </TabsContent>

          <TabsContent value="examples">
            <PracticalExamples />
          </TabsContent>

          <TabsContent value="extensions">
            <ExtensionGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
