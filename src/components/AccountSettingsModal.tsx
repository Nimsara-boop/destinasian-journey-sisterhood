import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Activity, Download, Trash2, Heart, MessageCircle, Calendar, MapPin, Users, Camera, Clock } from "lucide-react";
import { useAccountActivity } from "@/hooks/useAccountActivity";
import { useAccountData } from "@/hooks/useAccountData";
import { formatDistanceToNow } from "date-fns";

interface AccountSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

const AccountSettingsModal = ({ open, onOpenChange, userId }: AccountSettingsModalProps) => {
  const { activity, loading: activityLoading } = useAccountActivity(userId);
  const { exportAccountData, deleteAccount, loading: dataLoading } = useAccountData();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const handleExportData = () => {
    exportAccountData(userId);
  };

  const handleDeleteAccount = async () => {
    const success = await deleteAccount(userId);
    if (success) {
      onOpenChange(false);
      // Redirect will happen automatically due to auth state change
    }
  };

  const ActivityItem = ({ icon: Icon, title, content, date, metadata }: any) => (
    <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
      <Icon className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-medium truncate">{title}</h4>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </span>
        </div>
        {content && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{content}</p>
        )}
        {metadata && (
          <div className="flex items-center gap-2 mt-2">
            {metadata.map((item: any, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Account Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="data">Data Export</TabsTrigger>
            <TabsTrigger value="danger">Account</TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Account Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activityLoading ? (
                  <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {/* Posts */}
                      {activity.posts.map((post) => (
                        <ActivityItem
                          key={`post-${post.id}`}
                          icon={Camera}
                          title="Posted a photo"
                          content={post.content}
                          date={post.created_at}
                          metadata={[
                            `${post.likes_count} likes`,
                            `${post.comments_count} comments`,
                            post.location && `📍 ${post.location}`
                          ].filter(Boolean)}
                        />
                      ))}

                      {/* Likes */}
                      {activity.likes.map((like) => (
                        <ActivityItem
                          key={`like-${like.id}`}
                          icon={Heart}
                          title="Liked a post"
                          content={like.post_content}
                          date={like.created_at}
                        />
                      ))}

                      {/* Comments */}
                      {activity.comments.map((comment) => (
                        <ActivityItem
                          key={`comment-${comment.id}`}
                          icon={MessageCircle}
                          title="Commented on a post"
                          content={comment.content}
                          date={comment.created_at}
                        />
                      ))}

                      {/* Group Messages */}
                      {activity.groupMessages.map((message) => (
                        <ActivityItem
                          key={`group-msg-${message.id}`}
                          icon={Users}
                          title={`Sent message in ${message.group_name}`}
                          content={message.content}
                          date={message.created_at}
                        />
                      ))}

                      {/* Event Bookings */}
                      {activity.eventBookings.map((booking) => (
                        <ActivityItem
                          key={`event-${booking.id}`}
                          icon={Calendar}
                          title={`Booked event: ${booking.event_title}`}
                          date={booking.booked_at}
                          metadata={[
                            `${booking.participants} participant${booking.participants > 1 ? 's' : ''}`,
                            booking.total_amount && `$${booking.total_amount}`
                          ].filter(Boolean)}
                        />
                      ))}

                      {/* Tour Bookings */}
                      {activity.tourBookings.map((booking) => (
                        <ActivityItem
                          key={`tour-${booking.id}`}
                          icon={MapPin}
                          title={`Booked tour: ${booking.tour_title}`}
                          date={booking.booking_date}
                          metadata={[
                            `${booking.participants} participant${booking.participants > 1 ? 's' : ''}`,
                            booking.total_amount && `$${booking.total_amount}`
                          ].filter(Boolean)}
                        />
                      ))}

                      {/* Empty state */}
                      {Object.values(activity).every(arr => arr.length === 0) && (
                        <div className="text-center py-8">
                          <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="text-lg font-medium mb-2">No activity yet</h3>
                          <p className="text-muted-foreground">
                            Your account activity will appear here as you use the app.
                          </p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export Your Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Download a complete copy of your account data including posts, comments, likes, 
                  messages, bookings, and profile information.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Your data export will include:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Profile information and settings</li>
                    <li>• All posts, photos, and content you've shared</li>
                    <li>• Comments and likes on posts</li>
                    <li>• Messages and conversations</li>
                    <li>• Event and tour bookings</li>
                    <li>• Friend connections and followers</li>
                    <li>• Location sharing preferences</li>
                  </ul>
                </div>
                <Button 
                  onClick={handleExportData} 
                  disabled={dataLoading}
                  className="w-full"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {dataLoading ? "Preparing download..." : "Download My Data"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="danger" className="space-y-4">
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="w-5 h-5" />
                  Delete Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-destructive/10 p-4 rounded-lg">
                  <h4 className="font-medium text-destructive mb-2">⚠️ This action cannot be undone</h4>
                  <p className="text-sm text-muted-foreground">
                    Deleting your account will permanently remove:
                  </p>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Your profile and all posts</li>
                    <li>• All comments and likes</li>
                    <li>• Messages and conversations</li>
                    <li>• Event and tour bookings</li>
                    <li>• Friend connections</li>
                    <li>• All uploaded photos and content</li>
                  </ul>
                </div>
                
                <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete My Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={dataLoading}
                      >
                        {dataLoading ? "Deleting..." : "Yes, delete my account"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AccountSettingsModal;