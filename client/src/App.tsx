import { useState, useEffect } from 'react';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Assembly from "@/pages/assembly";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show landing page for now, authentication can be tested separately
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/assembly" component={Assembly} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Apply dark theme and content protection
  useEffect(() => {
    document.documentElement.classList.add('dark');

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const handleCopyCut = (event: ClipboardEvent) => {
      event.preventDefault();
      // Optionally, inform the user
      // alert('Copying content is disabled.');
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Disable Ctrl+C (copy) and Cmd+C on Mac
      if ((event.ctrlKey || event.metaKey) && event.key === 'c') {
        event.preventDefault();
      }
      // Disable Ctrl+X (cut) and Cmd+X on Mac
      if ((event.ctrlKey || event.metaKey) && event.key === 'x') {
        event.preventDefault();
      }
      // Optional: Disable Ctrl+A (select all) - use with caution
      // if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
      //   if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) {
      //       event.preventDefault();
      //   }
      // }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyCut as EventListener);
    document.addEventListener('cut', handleCopyCut as EventListener);
    document.addEventListener('keydown', handleKeyDown as EventListener);

    // Cleanup the event listeners when the component unmounts
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyCut as EventListener);
      document.removeEventListener('cut', handleCopyCut as EventListener);
      document.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
