/**
 * CMSHistoryPanel - Interface de Rollback (Fase 4)
 * Exibe histórico de alterações do CMS e permite restaurar versões anteriores
 */
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { History, RotateCcw, ChevronDown, ChevronUp, AlertTriangle, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useCMSHistory, useRestoreVersion, generateDiff, CMSHistoryEntry } from '@/hooks/useCMSHistory';
import { toast } from 'sonner';

interface CMSHistoryPanelProps {
  tableName: string;
  recordKey?: string;
  title?: string;
  description?: string;
}

export function CMSHistoryPanel({ 
  tableName, 
  recordKey, 
  title = 'Histórico de Alterações',
  description = 'Visualize e restaure versões anteriores'
}: CMSHistoryPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [restoreEntry, setRestoreEntry] = useState<CMSHistoryEntry | null>(null);

  const { data: history, isLoading, error } = useCMSHistory({
    tableName,
    recordKey,
    limit: 50
  });

  const { mutate: restore, isPending: isRestoring } = useRestoreVersion();

  const handleRestore = () => {
    if (!restoreEntry?.old_data || !restoreEntry.record_key) {
      toast.error('Dados insuficientes para restauração');
      return;
    }

    restore({
      tableName: restoreEntry.table_name,
      recordKey: restoreEntry.record_key,
      dataToRestore: restoreEntry.old_data
    }, {
      onSuccess: () => {
        toast.success('Versão restaurada com sucesso!');
        setRestoreEntry(null);
      },
      onError: (error) => {
        toast.error(`Erro ao restaurar: ${error.message}`);
      }
    });
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'INSERT':
        return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Criação</Badge>;
      case 'UPDATE':
        return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Alteração</Badge>;
      case 'DELETE':
        return <Badge className="bg-red-500/20 text-red-600 border-red-500/30">Remoção</Badge>;
      case 'BACKUP':
        return <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30">Backup</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            Carregando histórico...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5 text-destructive" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8 text-destructive">
            Erro ao carregar histórico
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <History className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {!history || history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <History className="h-12 w-12 mb-3 opacity-30" />
              <p>Nenhuma alteração registrada</p>
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {history.map((entry) => {
                  const isExpanded = expandedId === entry.id;
                  const diff = entry.action === 'UPDATE' 
                    ? generateDiff(entry.old_data, entry.new_data)
                    : null;
                  const canRestore = entry.action === 'UPDATE' && entry.old_data;

                  return (
                    <Collapsible 
                      key={entry.id}
                      open={isExpanded}
                      onOpenChange={() => setExpandedId(isExpanded ? null : entry.id)}
                    >
                      <div className="rounded-lg bg-background/50 overflow-hidden">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between p-3 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-3">
                              {getActionBadge(entry.action)}
                              <div className="text-left">
                                <p className="text-sm font-medium">
                                  {entry.record_key || entry.table_name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDate(entry.changed_at)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {canRestore && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-amber-600 hover:text-amber-300 hover:bg-amber-500/10"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setRestoreEntry(entry);
                                  }}
                                >
                                  <RotateCcw className="h-3.5 w-3.5 mr-1" />
                                  Restaurar
                                </Button>
                              )}
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          </div>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <div className="px-3 pb-3 border-t border-border/30">
                            {diff && (
                              <div className="mt-3 space-y-2">
                                {diff.added.length > 0 && (
                                  <div className="flex items-start gap-2">
                                    <Badge className="bg-green-500/20 text-green-600 text-xs">+</Badge>
                                    <span className="text-xs text-muted-foreground">
                                      Adicionados: {diff.added.join(', ')}
                                    </span>
                                  </div>
                                )}
                                {diff.changed.length > 0 && (
                                  <div className="flex items-start gap-2">
                                    <Badge className="bg-blue-500/20 text-blue-600 text-xs">~</Badge>
                                    <span className="text-xs text-muted-foreground">
                                      Alterados: {diff.changed.join(', ')}
                                    </span>
                                  </div>
                                )}
                                {diff.removed.length > 0 && (
                                  <div className="flex items-start gap-2">
                                    <Badge className="bg-red-500/20 text-red-600 text-xs">-</Badge>
                                    <span className="text-xs text-muted-foreground">
                                      Removidos: {diff.removed.join(', ')}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {entry.action === 'INSERT' && entry.new_data && (
                              <div className="mt-3">
                                <p className="text-xs text-muted-foreground mb-1">Dados criados:</p>
                                <pre className="text-xs bg-muted/30 p-2 rounded overflow-x-auto max-h-32">
                                  {JSON.stringify(entry.new_data, null, 2).slice(0, 500)}
                                  {JSON.stringify(entry.new_data).length > 500 && '...'}
                                </pre>
                              </div>
                            )}
                          </div>
                        </CollapsibleContent>
                      </div>
                    </Collapsible>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Modal de Confirmação de Restauração */}
      <AlertDialog open={!!restoreEntry} onOpenChange={() => setRestoreEntry(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-5 w-5" />
              Confirmar Restauração
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Você está prestes a restaurar <strong>{restoreEntry?.record_key}</strong> para a versão de{' '}
              <strong>{restoreEntry && formatDate(restoreEntry.changed_at)}</strong>.
              <br /><br />
              Esta ação irá sobrescrever os dados atuais. Deseja continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="gap-2">
              <X className="h-4 w-4" />
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRestore}
              disabled={isRestoring}
              className="bg-amber-500 hover:bg-amber-600 text-black gap-2"
            >
              {isRestoring ? (
                'Restaurando...'
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Confirmar Restauração
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
