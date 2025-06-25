import React from 'react';
import { characters } from '../data/characters';

interface LandingPageProps {
  onStartFortune: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartFortune }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <section className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-6 animate-fadeIn">
            「悩みを話すだけで、心が軽くなる」
          </h1>
          <p className="text-2xl md:text-3xl text-purple-100 mb-8 animate-fadeIn">
            AI占い師が24時間いつでもあなたの話を聞いてくれる
          </p>
          <button
            onClick={onStartFortune}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                     text-white font-bold py-4 px-8 rounded-full text-xl transform transition-all duration-300 
                     hover:scale-105 shadow-lg hover:shadow-xl animate-fadeIn"
          >
            占い師を選んで相談する
          </button>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            こんなお悩み、ありませんか？
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-purple-200 mb-4">恋愛・仕事・人間関係…</h3>
              <p className="text-purple-100">誰にも言えない不安、ありませんか？</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-purple-200 mb-4">忙しくて時間がない</h3>
              <p className="text-purple-100">占いに行く時間もない。けれど誰かに聞いてほしい。</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-purple-200 mb-4">AIだからこそ</h3>
            <p className="text-purple-100 text-lg">匿名・時間を選ばず、気軽に話せる</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              あなたの気分や悩みに応じて選べる5人のAI占い師
            </h2>
            <p className="text-xl text-purple-100">それぞれ異なる専門分野と個性を持っています</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <div
                key={character.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 group"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{character.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
                  <p className="text-sm text-purple-200 mb-3">{character.nameEn}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-purple-100">
                        {character.personality}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-purple-100">
                        {character.specialty}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-purple-100 mt-4 opacity-80">
                    {character.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            ご利用方法
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">占い師を選ぶ</h3>
              <p className="text-purple-100">あなたの悩みや気分に合った占い師を選択してください</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">悩みを入力</h3>
              <p className="text-purple-100">チャットで気軽にあなたの悩みを話してください</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">占い結果を受け取る</h3>
              <p className="text-purple-100">AIがあなたに合った占い結果とアドバイスをお届けします</p>
            </div>
          </div>
          
          <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-purple-200 text-center mb-4">安心してご利用ください</h3>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">完全匿名</h4>
                <p className="text-purple-100">個人情報の登録は不要です</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-2">プライバシー保護</h4>
                <p className="text-purple-100">相談内容は保存されません</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            今なら無料体験中
          </h2>
          <p className="text-2xl text-purple-100 mb-8">
            まずは気軽に、心の声を話してみませんか？
          </p>
          <button
            onClick={onStartFortune}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                     text-white font-bold py-6 px-12 rounded-full text-2xl transform transition-all duration-300 
                     hover:scale-105 shadow-lg hover:shadow-xl pulse"
          >
            今すぐ占いを始める
          </button>
          
          <div className="mt-12 text-xs text-purple-200">
            <p>※ 本サービスはAIによる擬似占いです。実在の占い師ではありません。</p>
          </div>
        </div>
      </section>
    </div>
  );
};
