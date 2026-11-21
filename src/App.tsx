import React, { useState } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { SidebarNav, NavTabId } from './components/SidebarNav';
import { DashboardWorkspace } from './components/DashboardWorkspace';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { PrivacyModal } from './components/PrivacyModal';

export default function App() {
  const [logoUrl] = useState<string | null>('https://i.imgur.com/7AbHDOo.png');
  const [netoPhotoUrl] = useState<string | null>('https://i.imgur.com/fHzf2cJ.jpg');
  const [activeTab, setActiveTab] = useState<NavTabId>('overview');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#D5DFEB] text-[#132033] font-sans antialiased selection:bg-[#7C3AED] selection:text-white relative overflow-x-clip flex items-stretch sm:items-center justify-center p-0 sm:py-5 sm:px-5">
      {/* Fast Zero-Lag Pastel Studio Backdrop */}
      <BackgroundCanvas />

      {/* Creamy Light Claymorphism Shell with Dark Slate Sidebar */}
      <div className="relative z-10 w-full max-w-[1280px] rounded-none sm:rounded-[34px] bg-[#EAF0F6] clay-shell overflow-hidden flex flex-col lg:flex-row min-h-screen sm:min-h-[calc(100vh-2.5rem)]">
        <SidebarNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          logoUrl={logoUrl}
          netoPhotoUrl={netoPhotoUrl}
        />

        <DashboardWorkspace
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          logoUrl={logoUrl}
          netoPhotoUrl={netoPhotoUrl}
          onOpenPrivacyModal={() => setIsPrivacyOpen(true)}
        />
      </div>

      <FloatingWhatsApp netoPhotoUrl={netoPhotoUrl} />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
