import React from 'react';
import { Play, Heart, MessageCircle, Share2, Smartphone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const TikTokPage = () => {
    const videos = [
        {
            id: 1,
            link: 'https://vt.tiktok.com/ZS5AeAto4/',
            title: 'Serunya Belajar di BIN Bimbel!',
            likes: '1.2K',
            comments: '45',
            gradient: 'from-pink-500 to-rose-500'
        },
        {
            id: 2,
            link: 'https://vt.tiktok.com/ZS5AeXdtD/',
            title: 'Tips Cepat Paham Matematika',
            likes: '856',
            comments: '32',
            gradient: 'from-purple-500 to-indigo-500'
        },
        {
            id: 3,
            link: 'https://vt.tiktok.com/ZS5AeEaXr/',
            title: 'Suasana Kelas yang Kondusif',
            likes: '2.5K',
            comments: '120',
            gradient: 'from-cyan-500 to-blue-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-4">
                <div className="container mx-auto text-center space-y-4 animate-fadeInUp">
                    <div className="inline-flex items-center justify-center p-3 bg-black text-white rounded-full mb-4 animate-bounce">
                        <Smartphone className="h-6 w-6 mr-2" />
                        <span className="font-bold">Trending on TikTok</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                        Kegiatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ea] to-[#ff0050]">BIN Bimbel</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Intip keseruan dan metode belajar asyik kami lewat video pendek!
                    </p>
                </div>
            </section>

            {/* TikTok Grid */}
            <section className="pb-20 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {videos.map((video, index) => (
                            <div
                                key={video.id}
                                className="flex justify-center animate-fadeInUp"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                {/* Phone Mockup */}
                                <div className="relative w-[300px] h-[600px] bg-gray-900 rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-xl z-20"></div>

                                    {/* Screen Content */}
                                    <div className={`w-full h-full bg-gradient-to-br ${video.gradient} relative flex flex-col`}>

                                        {/* Fake Video UI Overlay */}
                                        <div className="flex-1 flex items-center justify-center relative">
                                            {/* Play Button Icon */}
                                            <a
                                                href={video.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all cursor-pointer group"
                                            >
                                                <Play className="h-8 w-8 text-white fill-white ml-1 group-hover:scale-110 transition-transform" />
                                            </a>

                                            {/* Video Title - Simulated text on video */}
                                            <div className="absolute bottom-20 left-4 right-16 text-white text-left">
                                                <p className="font-bold text-lg drop-shadow-md">@binbimbel_official</p>
                                                <p className="text-sm opacity-90 leading-tight mt-1 drop-shadow-md">{video.title} #belajarasik #bimbel</p>
                                            </div>

                                            {/* Sidebar Actions */}
                                            <div className="absolute bottom-20 right-2 flex flex-col items-center space-y-4 text-white">
                                                <div className="flex flex-col items-center space-y-1">
                                                    <div className="w-10 h-10 bg-gray-600 rounded-full border-2 border-white overflow-hidden">
                                                        <img src="/logo.png" alt="Profile" className="w-full h-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center space-y-1">
                                                    <Heart className="h-8 w-8 fill-white text-white drop-shadow-md" />
                                                    <span className="text-xs font-bold drop-shadow-md">{video.likes}</span>
                                                </div>
                                                <div className="flex flex-col items-center space-y-1">
                                                    <MessageCircle className="h-8 w-8 text-white drop-shadow-md" />
                                                    <span className="text-xs font-bold drop-shadow-md">{video.comments}</span>
                                                </div>
                                                <div className="flex flex-col items-center space-y-1">
                                                    <Share2 className="h-8 w-8 text-white drop-shadow-md" />
                                                    <span className="text-xs font-bold drop-shadow-md">Share</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom CTA Area */}
                                        <div className="p-4 bg-black/40 backdrop-blur-md">
                                            <a href={video.link} target="_blank" rel="noopener noreferrer">
                                                <Button className="w-full bg-[#fe2c55] hover:bg-[#e6264a] text-white font-bold rounded-xl h-12 flex items-center justify-center space-x-2 transition-all hover:shadow-[0_0_15px_rgba(254,44,85,0.5)]">
                                                    <Play className="h-4 w-4 fill-white" />
                                                    <span>Tonton Video</span>
                                                </Button>
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Follow CTA */}
                    <div className="text-center mt-16 animate-fadeInUp">
                        <p className="text-xl text-gray-600 mb-8">
                            Jangan lupa follow media sosial kami di :
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                            <a
                                href="https://tiktok.com/@bunia_bin"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-6 text-lg rounded-full transition-all flex items-center space-x-2 w-64 justify-center">
                                    <span className="text-xl">🎵</span>
                                    <span>@bunia_bin</span>
                                </Button>
                            </a>
                            <a
                                href="https://www.youtube.com/@binbimbel8284"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold px-8 py-6 text-lg rounded-full transition-all flex items-center space-x-2 w-64 justify-center">
                                    <Play className="h-6 w-6 fill-current" />
                                    <span>BIN Bimbel</span>
                                </Button>
                            </a>
                            <a
                                href="https://www.instagram.com/bin.familynew?igsh=MWFqdjhndGU5bWIzZg=="
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white font-bold px-8 py-6 text-lg rounded-full transition-all flex items-center space-x-2 w-64 justify-center">
                                    <Smartphone className="h-6 w-6" />
                                    <span>@bin.familynew</span>
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TikTokPage;
