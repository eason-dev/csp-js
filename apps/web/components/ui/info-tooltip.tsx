'use client';

import { HelpCircle, ExternalLink } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface InfoTooltipProps {
  content: string;
  className?: string;
  referenceUrl?: string;
  referenceText?: string;
}

export function InfoTooltip({
  content,
  className = '',
  referenceUrl,
  referenceText = 'Learn more',
}: InfoTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`text-muted-foreground hover:text-foreground inline-flex h-4 w-4 items-center justify-center rounded-full transition-colors ${className}`}
          type="button"
        >
          <HelpCircle className="h-3 w-3" />
          <span className="sr-only">More information</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-xs">
        <div className="space-y-2">
          <p className="text-sm">{content}</p>
          {referenceUrl && (
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-full text-xs"
              onClick={() => window.open(referenceUrl, '_blank', 'noopener,noreferrer')}
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              {referenceText}
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
