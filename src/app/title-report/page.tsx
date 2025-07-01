"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Save,
  Download,
  Share,
  MoreVertical,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo,
  Redo,
  Eye,
  Clock,
} from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  category: "standard" | "detailed" | "summary"
  lastUsed?: string
  content: string
}

const templates: Template[] = [
  {
    id: "standard-title-report",
    name: "Standard Title Report",
    description: "Comprehensive title report template with all standard sections",
    category: "standard",
    lastUsed: "2 days ago",
    content: `<h1>TITLE REPORT</h1>

<h2>Property Details</h2>
<p><strong>Address:</strong> 7 Blake Street, Buckinghamshire</p>
<p><strong>Title Number:</strong> BM123456</p>
<p><strong>Tenure:</strong> Freehold</p>
<p><strong>Registered Proprietor:</strong> [To be completed]</p>

<h2>Executive Summary</h2>
<p>This report provides an analysis of the title to the above property based on our investigation of the Land Registry entries and supporting documents.</p>

<h2>Title Analysis</h2>
<h3>Ownership</h3>
<p>[Analysis of current ownership and any restrictions]</p>

<h3>Charges and Encumbrances</h3>
<p>[Details of any charges, mortgages, or other encumbrances]</p>

<h3>Easements and Rights</h3>
<p>[Analysis of rights of way, easements, and other third-party rights]</p>

<h2>Recommendations</h2>
<p>[Professional recommendations and advice]</p>

<h2>Conclusion</h2>
<p>[Summary and final assessment]</p>`,
  },
  {
    id: "summary-title-report",
    name: "Title Summary Report",
    description: "Concise summary report for straightforward transactions",
    category: "summary",
    lastUsed: "1 week ago",
    content: `<h1>TITLE SUMMARY REPORT</h1>

<h2>Property: 7 Blake Street, Buckinghamshire</h2>
<p><strong>Title Number:</strong> BM123456</p>
<p><strong>Tenure:</strong> Freehold</p>

<h2>Key Findings</h2>
<ul>
<li>Good marketable title</li>
<li>No adverse entries noted</li>
<li>Standard mortgage charge in favor of [Lender]</li>
</ul>

<h2>Recommendations</h2>
<p>The title appears satisfactory for the proposed transaction.</p>`,
  },
  {
    id: "detailed-title-report",
    name: "Detailed Title Investigation",
    description: "Comprehensive report for complex transactions with detailed analysis",
    category: "detailed",
    content: `<h1>DETAILED TITLE INVESTIGATION REPORT</h1>

<h2>Instructions and Scope</h2>
<p>We have been instructed to investigate the title to the above property and report on all matters affecting the same.</p>

<h2>Property Description</h2>
<p><strong>Address:</strong> 7 Blake Street, Buckinghamshire</p>
<p><strong>Title Number:</strong> BM123456</p>
<p><strong>Tenure:</strong> Freehold</p>
<p><strong>Area:</strong> [To be confirmed]</p>

<h2>Historical Title Analysis</h2>
<h3>Chain of Title</h3>
<p>[Detailed analysis of ownership history]</p>

<h3>Previous Transactions</h3>
<p>[Analysis of previous sales and transfers]</p>

<h2>Current Title Position</h2>
<h3>Registered Proprietor</h3>
<p>[Current owner details and capacity]</p>

<h3>Restrictions and Notices</h3>
<p>[Detailed analysis of all restrictions]</p>

<h3>Charges Register</h3>
<p>[Analysis of all charges and encumbrances]</p>

<h2>Third Party Rights</h2>
<h3>Easements</h3>
<p>[Detailed analysis of easements]</p>

<h3>Covenants</h3>
<p>[Analysis of restrictive and positive covenants]</p>

<h2>Planning and Statutory Matters</h2>
<p>[Analysis of planning permissions and statutory requirements]</p>

<h2>Risk Assessment</h2>
<p>[Detailed risk analysis and mitigation strategies]</p>

<h2>Conclusions and Recommendations</h2>
<p>[Comprehensive conclusions and professional advice]</p>`,
  },
]

export default function TitleReportPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [documentTitle, setDocumentTitle] = useState("Untitled Title Report")
  const [content, setContent] = useState("")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [showPlaceholder, setShowPlaceholder] = useState(true)
  const editorRef = useRef<HTMLDivElement>(null)

  // Auto-save functionality
  useEffect(() => {
    if (content && content.length > 0) {
      setIsAutoSaving(true)
      const timer = setTimeout(() => {
        setLastSaved(new Date())
        setIsAutoSaving(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [content])

  // Update editor content when template is selected
  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.innerHTML = content
      setShowPlaceholder(false)
    }
  }, [content])

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setContent(template.content)
    setDocumentTitle(template.name)
    setShowPlaceholder(false)
  }

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      setContent(newContent)
      setShowPlaceholder(newContent.trim() === "" || newContent === "<br>")
    }
  }

  const executeCommand = (command: string, value?: string) => {
    try {
      // Focus the editor first
      if (editorRef.current) {
        editorRef.current.focus()
      }

      // Execute the command
      document.execCommand(command, false, value)

      // Update content after command execution
      setTimeout(() => {
        handleContentChange()
      }, 0)
    } catch (error) {
      console.warn(`Command ${command} failed:`, error)
    }
  }

  const handleSave = () => {
    setLastSaved(new Date())
    // Implement save functionality
  }

  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Saved just now"
    if (minutes === 1) return "Saved 1 minute ago"
    if (minutes < 60) return `Saved ${minutes} minutes ago`

    return `Saved at ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
  }

  const handleBlankDocument = () => {
    setSelectedTemplate(null)
    setContent("")
    setDocumentTitle("Untitled Title Report")
    setShowPlaceholder(true)
    if (editorRef.current) {
      editorRef.current.innerHTML = ""
    }
  }

  const handleEditorFocus = () => {
    if (showPlaceholder) {
      setShowPlaceholder(false)
      if (editorRef.current) {
        editorRef.current.innerHTML = ""
      }
    }
  }

  return (
    <div className="flex flex-1 h-[calc(100vh-4rem)] overflow-hidden">
      {/* Template Sidebar */}
      <div className="w-80 border-r border-border bg-muted/20 flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-semibold mb-2">Templates</h2>
          <p className="text-sm text-muted-foreground">Choose a template to get started</p>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-3">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-sm ${
                selectedTemplate?.id === template.id ? "bg-primary/5 border-primary/20" : "hover:bg-muted/40"
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-sm">{template.name}</CardTitle>
                  </div>
                  <Badge
                    variant={
                      template.category === "standard"
                        ? "default"
                        : template.category === "detailed"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs mb-2">{template.description}</CardDescription>
                {template.lastUsed && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Used {template.lastUsed}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          <Card
            className="border-dashed border-2 cursor-pointer hover:bg-muted/40 transition-colors"
            onClick={handleBlankDocument}
          >
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">Start from Blank</p>
                <p className="text-xs text-muted-foreground">Create a custom report</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Document Header */}
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between mb-3">
            <Input
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-lg font-semibold border-none shadow-none p-0 h-auto focus-visible:ring-0 max-w-md"
            />
            <div className="flex items-center gap-2">
              {isAutoSaving ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  Saving...
                </div>
              ) : lastSaved ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  {formatLastSaved(lastSaved)}
                </div>
              ) : null}
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Share for Review
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as Word
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Document Settings</DropdownMenuItem>
                  <DropdownMenuItem>Version History</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Print</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-1 flex-wrap">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => executeCommand("undo")} className="h-8 w-8 p-0">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => executeCommand("redo")} className="h-8 w-8 p-0">
                <Redo className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Select defaultValue="Arial" onValueChange={(value) => executeCommand("fontName", value)}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                <SelectItem value="Calibri">Calibri</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="12" onValueChange={(value) => executeCommand("fontSize", value)}>
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="11">11</SelectItem>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="14">14</SelectItem>
                <SelectItem value="16">16</SelectItem>
                <SelectItem value="18">18</SelectItem>
                <SelectItem value="24">24</SelectItem>
              </SelectContent>
            </Select>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => executeCommand("bold")} className="h-8 w-8 p-0">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => executeCommand("italic")} className="h-8 w-8 p-0">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => executeCommand("underline")} className="h-8 w-8 p-0">
                <Underline className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => executeCommand("justifyLeft")} className="h-8 w-8 p-0">
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => executeCommand("justifyCenter")} className="h-8 w-8 p-0">
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => executeCommand("justifyRight")} className="h-8 w-8 p-0">
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => executeCommand("insertUnorderedList")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => executeCommand("insertOrderedList")}
                className="h-8 w-8 p-0"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-auto bg-gray-50 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow-sm border rounded-lg min-h-[800px] relative">
              <div
                ref={editorRef}
                contentEditable
                onInput={handleContentChange}
                onBlur={handleContentChange}
                onFocus={handleEditorFocus}
                className="p-12 min-h-[800px] focus:outline-none prose prose-sm max-w-none"
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontSize: "12pt",
                  lineHeight: "1.6",
                  color: "#333",
                }}
                suppressContentEditableWarning={true}
              />
              {showPlaceholder && (
                <div className="absolute top-12 left-12 text-muted-foreground pointer-events-none">
                  <p>Select a template from the sidebar to get started, or begin typing your title report here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
