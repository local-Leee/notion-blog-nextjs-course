import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SocialLinks } from '@/types/notion';
import { Youtube, Github, BookOpen, Instagram, Megaphone, Handshake } from 'lucide-react';

interface ProfileSectionProps {
  socialLinks: SocialLinks[];
}

export function ProfileSection({ socialLinks }: ProfileSectionProps) {
  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-muted rounded-full p-2">
                <div className="h-36 w-36 overflow-hidden rounded-full">
                  <Image
                    src="/images/profile-light.png"
                    alt="현지인"
                    width={144}
                    height={144}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold">현지인</h3>
              <p className="text-primary text-sm">Full Stack Developer</p>
            </div>

            <div className="flex justify-center gap-2">
              {socialLinks.map((item, index) => (
                <Button key={index} variant="ghost" className="bg-primary/10" size="icon" asChild>
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    <item.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>

            <p className="bg-primary/10 rounded p-2 text-center text-sm">코딩 교육 크리에이터 ✨</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
