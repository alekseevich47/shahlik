import { KeyRound, Trash2 } from "lucide-react"
import { useEffect, useState, type FormEvent } from "react"
import { toast } from "sonner"

import {
  useCreateStaff,
  useDeleteStaff,
  useRequestStaffPasswordReset,
  useStaff,
  useUpdateStaff,
  type StaffMember,
} from "@/entities/staff/api"
import { DataTable, type Column } from "@/pages/admin/ui/DataTable"
import { EmptyState } from "@/pages/admin/ui/EmptyState"
import { SectionShell } from "@/pages/admin/ui/SectionShell"
import { SkeletonRows } from "@/pages/admin/ui/SkeletonRows"
import { Toolbar, type ToolbarFilter } from "@/pages/admin/ui/Toolbar"
import { useAdminAuth, type StaffRole } from "@/shared/api/auth"
import { formatDate } from "@/shared/lib/format"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { useConfirm } from "@/shared/ui/confirm-dialog"
import { Field, Input } from "@/shared/ui/input"
import { Select } from "@/shared/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/shared/ui/sheet"
import { Switch } from "@/shared/ui/switch"

const ROLE_FILTERS: ToolbarFilter[] = [
  { id: "all", label: "Все" },
  { id: "admin", label: "Админы" },
  { id: "manager", label: "Менеджеры" },
]

const ROLE_LABEL: Record<StaffRole, string> = {
  admin: "Админ",
  manager: "Менеджер",
}

export function StaffSection() {
  const { user } = useAdminAuth()
  const currentUserId = user?.id ?? ""
  const { data: staff = [], isPending } = useStaff()
  const updateStaff = useUpdateStaff()
  const deleteStaff = useDeleteStaff()
  const resetPassword = useRequestStaffPasswordReset()
  const { confirm, dialog } = useConfirm()

  const [query, setQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [formOpen, setFormOpen] = useState(false)

  const busy =
    updateStaff.isPending || deleteStaff.isPending || resetPassword.isPending

  const filtered = staff.filter((item) => {
    if (roleFilter !== "all" && item.role !== roleFilter) return false
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      item.email.toLowerCase().includes(q) ||
      item.name.toLowerCase().includes(q)
    )
  })

  const handleRoleChange = async (member: StaffMember, role: StaffRole) => {
    if (member.role === role) return
    try {
      await updateStaff.mutateAsync({ id: member.id, data: { role } })
      toast.success("Роль обновлена")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  const handleVerifiedChange = async (member: StaffMember, verified: boolean) => {
    if (member.verified === verified) return
    try {
      await updateStaff.mutateAsync({ id: member.id, data: { verified } })
      toast.success(verified ? "Подтверждён" : "Снят с подтверждения")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось сохранить")
    }
  }

  const handleResetPassword = async (member: StaffMember) => {
    const ok = await confirm({
      title: `Сбросить пароль для ${member.email}?`,
      description: "На почту уйдёт ссылка для нового пароля.",
      confirmLabel: "Отправить",
      cancelLabel: "Отмена",
    })
    if (!ok) return

    try {
      await resetPassword.mutateAsync(member.email)
      toast.success("Письмо отправлено")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось отправить")
    }
  }

  const handleDelete = async (member: StaffMember) => {
    if (member.id === currentUserId) {
      toast.error("Нельзя удалить свой аккаунт")
      return
    }

    const ok = await confirm({
      title: `Удалить ${member.email}?`,
      description: "Сотрудник потеряет доступ к админке.",
      confirmLabel: "Удалить",
      cancelLabel: "Отмена",
      danger: true,
    })
    if (!ok) return

    try {
      await deleteStaff.mutateAsync({ id: member.id, currentUserId })
      toast.success("Удалено")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось удалить")
    }
  }

  const columns: Column<StaffMember>[] = [
    {
      key: "user",
      header: "Сотрудник",
      render: (row) => (
        <span className="flex flex-col leading-tight">
          <span className="font-bold text-fg">{row.name || row.email}</span>
          {row.name ? (
            <span className="text-[11px] text-fg-muted">{row.email}</span>
          ) : null}
          {row.id === currentUserId ? (
            <span className="text-[10.5px] text-brand">это вы</span>
          ) : null}
        </span>
      ),
    },
    {
      key: "role",
      header: "Роль",
      render: (row) => (
        <span onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <Select
            value={row.role}
            disabled={busy}
            className="h-9 w-[140px] text-[12.5px]"
            aria-label={`Роль ${row.email}`}
            onChange={(e) => handleRoleChange(row, e.target.value as StaffRole)}
          >
            <option value="admin">{ROLE_LABEL.admin}</option>
            <option value="manager">{ROLE_LABEL.manager}</option>
          </Select>
        </span>
      ),
    },
    {
      key: "verified",
      header: "Verified",
      render: (row) => (
        <span
          className="inline-flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Switch
            checked={row.verified}
            disabled={busy}
            aria-label={row.verified ? "Снять verified" : "Подтвердить email"}
            onCheckedChange={(checked) => handleVerifiedChange(row, checked)}
          />
          <Badge variant={row.verified ? "success" : "outline"}>
            {row.verified ? "Да" : "Нет"}
          </Badge>
        </span>
      ),
    },
    {
      key: "created",
      header: "Создан",
      render: (row) => (
        <span className="text-[12.5px] text-fg-soft">{formatDate(row.createdAt)}</span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "w-[88px] text-right",
      render: (row) => {
        const isSelf = row.id === currentUserId
        return (
          <span className="inline-flex gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={busy}
              aria-label="Сбросить пароль"
              onClick={(e) => {
                e.stopPropagation()
                void handleResetPassword(row)
              }}
            >
              <KeyRound size={16} strokeWidth={2.2} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={busy || isSelf}
              aria-label={isSelf ? "Нельзя удалить себя" : "Удалить"}
              title={isSelf ? "Нельзя удалить себя" : undefined}
              onClick={(e) => {
                e.stopPropagation()
                void handleDelete(row)
              }}
            >
              <Trash2 size={16} strokeWidth={2.2} />
            </Button>
          </span>
        )
      },
    },
  ]

  return (
    <SectionShell
      title="Сотрудники"
      description="Админы и менеджеры. Менеджер видит каталог, заказы и отзывы — без купонов, сотрудников и настроек."
    >
      <Toolbar
        searchPlaceholder="Почта или имя…"
        onSearchChange={setQuery}
        filters={ROLE_FILTERS}
        activeFilter={roleFilter}
        onFilterChange={setRoleFilter}
        createLabel="Добавить"
        onCreate={() => setFormOpen(true)}
      />

      {isPending ? (
        <SkeletonRows rows={6} cols={5} />
      ) : !staff.length ? (
        <EmptyState
          title="Сотрудников пока нет"
          description="Создайте менеджера — он войдёт по почте и паролю."
        />
      ) : !filtered.length ? (
        <EmptyState title="Ничего не найдено" description="Измените фильтр или поиск." />
      ) : (
        <div className="rounded-[var(--r-md)] border border-line bg-surface p-1">
          <DataTable columns={columns} rows={filtered} rowKey={(s) => s.id} busy={busy} />
        </div>
      )}

      <StaffCreateForm open={formOpen} onOpenChange={setFormOpen} />
      {dialog}
    </SectionShell>
  )
}

function StaffCreateForm({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const createStaff = useCreateStaff()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [role, setRole] = useState<StaffRole>("manager")
  const [verified, setVerified] = useState(true)

  useEffect(() => {
    if (!open) return
    setEmail("")
    setName("")
    setPassword("")
    setPasswordConfirm("")
    setRole("manager")
    setVerified(true)
  }, [open])

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      toast.error("Укажите почту")
      return
    }
    if (password.length < 8) {
      toast.error("Пароль — минимум 8 символов")
      return
    }
    if (password !== passwordConfirm) {
      toast.error("Пароли не совпадают")
      return
    }

    try {
      await createStaff.mutateAsync({
        email: trimmedEmail,
        password,
        passwordConfirm,
        name: name.trim() || undefined,
        role,
        verified,
      })
      toast.success("Сотрудник создан")
      onOpenChange(false)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Не удалось создать")
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full max-w-md flex-col gap-4 overflow-y-auto">
        <div>
          <SheetTitle>Новый сотрудник</SheetTitle>
          <SheetDescription>
            Менеджер войдёт в админку и увидит только доступные разделы.
          </SheetDescription>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <Field label="Почта">
            <Input
              type="email"
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <Field label="Имя">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Необязательно"
            />
          </Field>

          <Field label="Роль">
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value as StaffRole)}
            >
              <option value="manager">{ROLE_LABEL.manager}</option>
              <option value="admin">{ROLE_LABEL.admin}</option>
            </Select>
          </Field>

          <Field label="Пароль">
            <Input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <Field label="Повтор пароля">
            <Input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </Field>

          <div className="flex items-center justify-between gap-3 rounded-[var(--r-md)] border border-line bg-surface-2 px-3 py-2.5">
            <span className="text-[13px] font-semibold text-fg">Email подтверждён</span>
            <Switch checked={verified} onCheckedChange={setVerified} aria-label="Verified" />
          </div>

          <div className="mt-2 flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              disabled={createStaff.isPending}
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="brand"
              className="flex-1"
              disabled={createStaff.isPending}
            >
              {createStaff.isPending ? "Создаём…" : "Создать"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
