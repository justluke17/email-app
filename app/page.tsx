import { Search, Inbox, Target, Send, FileText, Trash2, Shield, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge" 

export default function SponsorInbox() {
  const sidebarItems = [
    { icon: Inbox, label: "Main Inbox", active: true },
    { icon: Target, label: "Similar to your Niche" },
    { icon: Send, label: "Sent" },
    { icon: FileText, label: "Drafts" },
    { icon: Shield, label: "Spam" },
    { icon: Trash2, label: "Trash" },
  ]

  const sponsorshipRequests = [
    {
      id: 1,
      company: "TechBrand Inc.",
      title: "Sponsorship Request: TechBrand Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "2 days ago",
      risk: "Low",
      summary:
        "This is a sponsorship opportunity from a well-known brand in the tech industry. They are looking for a creator to promote their new product launch. The budget is $5,000.",
      riskColor: "bg-green-500",
    },
    {
      id: 2,
      company: "GameDev Studio",
      title: "Sponsorship Request: GameDev Studio",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "3 days ago",
      risk: "Medium",
      summary:
        "A gaming company is seeking a creator to review their latest game. They offer a free copy of the game and a commission based on sales.",
      riskColor: "bg-yellow-500",
    },
    {
      id: 3,
      company: "FitGear Co.",
      title: "Sponsorship Request: FitGear Co.",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "4 days ago",
      risk: "Low",
      summary:
        "A fitness apparel company wants a creator to showcase their new activewear line. They are offering a product sponsorship and a discount code for the creator's audience.",
      riskColor: "bg-green-500",
    },
    {
      id: 4,
      company: "FoodieExpress",
      title: "Sponsorship Request: FoodieExpress",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "5 days ago",
      risk: "Medium",
      summary:
        "A food delivery service is looking for a creator to promote their app. They are offering a flat fee of $1,000 and a referral bonus.",
      riskColor: "bg-yellow-500",
    },
    {
      id: 5,
      company: "Wanderlust Travel",
      title: "Sponsorship Request: Wanderlust Travel",
      avatar: "/placeholder.svg?height=40&width=40",
      timeAgo: "6 days ago",
      risk: "High",
      summary:
        "A travel agency is seeking a creator to document their trip to a tropical destination. They are offering an all-expenses-paid trip and a fee of $2,000.",
      riskColor: "bg-red-500",
    },
  ]

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-semibold">CollabPilot<br></h1>
        </div>

        <nav className="flex-1 space-y-2 shadow-none">
          {sidebarItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                item.active ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Inbox</h2>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input placeholder="Search" className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400" />
          </div>

          {/* Potential Revenue Card */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardContent className="p-4">
              <div className="text-gray-400 text-sm mb-1">Potential Revenue</div>
              <div className="text-2xl font-bold">$8,000</div>
            </CardContent>
          </Card>

          {/* Filter Tabs */}
          <div className="flex gap-6">
            <button className="text-white border-b-2 border-white pb-2">All</button>
            <button className="text-gray-400 hover:text-white pb-2">Unread</button>
            <button className="text-gray-400 hover:text-white pb-2">Starred</button>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {sponsorshipRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-start gap-4 p-6 border-b border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <Avatar className="w-12 h-12">
                <AvatarImage src={request.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gray-600">{request.company.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-white truncate">{request.title}</h3>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <span>{request.company}</span>
                  <span>•</span>
                  <span>{request.timeAgo}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <span>Risk:</span>
                    <Badge variant="secondary" className={`${request.riskColor} text-white text-xs px-2 py-0.5`}>
                      {request.risk}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  <span className="font-medium">Summary:</span> {request.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
