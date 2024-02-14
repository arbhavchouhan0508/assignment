import React from 'react';
import Header from './components/Header';
import UploadArea from './components/UploadArea';

export default function App() {
    return (
        <div className='bg-gray-900 h-screen'>
            <Header />
            <UploadArea />
        </div>
    )
}
