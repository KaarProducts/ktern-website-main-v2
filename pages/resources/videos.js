import Layout from "../../component/Layout";
import React, { useState } from "react";
import { Tabs, Tab, Box } from '@mui/material';

export default function Videos({ h_data, f_data, data }) {
  const [selectedMainTab, setSelectedMainTab] = useState(0);
  const [selectedSubTab, setSelectedSubTab] = useState(0);

  const handleMainTabChange = (event, newValue) => {
    setSelectedMainTab(newValue);
    setSelectedSubTab(0); // Reset sub tab when main tab changes
  };

  const handleSubTabChange = (event, newValue) => {
    setSelectedSubTab(newValue);
  };

  const getCurrentVideos = () => {
    const mainTab = data.tabs[selectedMainTab];
    const subTab = mainTab.subTabs[selectedSubTab];
    
    return data.videosList.find(video => 
      video.tabId === mainTab.tabId && 
      video.subTabId === subTab.tabId
    )?.videos || [];
  };

  return (
    <Layout h_data={h_data} f_data={f_data}>
      <div className="bg-bg">
        <section className="py-10 flex flex-col items-center justify-center">
          <h2 className="section-heading mb-4">{data.filterSection.heading}</h2>
          <p className="section-subheading text-gray-10">
            {data.filterSection.subheading}
          </p>
        </section>
        
        <section className="py-5 px-20 mx-auto flex flex-col items-center justify-center">
          {/* Main Tabs */}
          <Tabs 
            value={selectedMainTab}
            onChange={handleMainTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            {data.tabs.map((tab, index) => (
              <Tab 
                key={tab.tabId}
                label={tab.tabName}
                id={`main-tab-${index}`}
                aria-controls={`main-tabpanel-${index}`}
              />
            ))}
          </Tabs>

          {/* Main Tab Content */}
          <Box sx={{ width: '100%', p: 3 }}>
            {/* Sub Tabs */}
            {data.tabs[selectedMainTab]?.subTabs && (
              <Tabs
                value={selectedSubTab}
                onChange={handleSubTabChange}
                variant="scrollable"
                scrollButtons="auto"
              >
                {data.tabs[selectedMainTab].subTabs.map((subTab, index) => (
                  <Tab
                    key={subTab.tabId}
                    label={subTab.tabName}
                    id={`sub-tab-${index}`}
                    aria-controls={`sub-tabpanel-${index}`}
                  />
                ))}
              </Tabs>
            )}

            {/* Video List */}
            <div className="mt-4">
              {getCurrentVideos().map((video) => (
                <div key={video.id} className="my-2 p-2 border-b">
                  <p className="text-lg font-medium">{video.title}</p>
                  {/* Add more video details as needed */}
                </div>
              ))}
            </div>
          </Box>
        </section>
      </div>
    </Layout>
  );
}

// Keep getStaticProps the same
export const getStaticProps = async () => {
  // ... existing implementation ...
};