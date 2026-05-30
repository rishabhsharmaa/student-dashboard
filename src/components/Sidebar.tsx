"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Mobile top bar trigger ─────────── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-surface/80 backdrop-blur-xl border-b border-border">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Learnova
        </span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg text-muted hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* ── Mobile overlay menu ────────────── */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <motion.nav
        initial={{ x: "-100%" }}
        animate={{ x: mobileOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="lg:hidden fixed top-14 left-0 bottom-0 z-40 w-64 bg-surface border-r border-border p-4 flex flex-col gap-1"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActive(item.id);
                setMobileOpen(false);
              }}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="mobile-active"
                  className="absolute inset-0 rounded-xl bg-accent-muted"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                  }}
                />
              )}
              <Icon
                size={18}
                className={`relative z-10 ${isActive ? "text-accent" : "text-muted"}`}
              />
              <span
                className={`relative z-10 ${isActive ? "text-foreground font-medium" : "text-muted"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </motion.nav>

      {/* ── Desktop / Tablet sidebar ───────── */}
      <motion.nav
        animate={{ width: collapsed ? 72 : 220 }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
        className="hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-30 bg-surface/60 backdrop-blur-xl border-r border-border"
      >
        {/* Logo area */}
        <div className="flex items-center justify-between h-16 px-4">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-semibold tracking-tight text-foreground"
            >
              Learnova
            </motion.span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-muted hover:text-foreground hover:bg-surface-hover transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.span
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="block"
            >
              <ChevronLeft size={16} />
            </motion.span>
          </button>
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-1 px-3 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`relative flex items-center gap-3 rounded-xl text-sm transition-colors ${
                  collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5"
                }`}
                title={collapsed ? item.label : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="desktop-active"
                    className="absolute inset-0 rounded-xl bg-accent-muted"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 28,
                    }}
                  />
                )}
                <Icon
                  size={18}
                  className={`relative z-10 flex-shrink-0 ${isActive ? "text-accent" : "text-muted"}`}
                />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`relative z-10 whitespace-nowrap ${
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>
      </motion.nav>

      {/* ── Mobile bottom nav ──────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-16 bg-surface/90 backdrop-blur-xl border-t border-border">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className="relative flex flex-col items-center gap-0.5 py-1 px-3"
            >
              {isActive && (
                <motion.span
                  layoutId="bottomnav-active"
                  className="absolute -top-px left-1/2 -translate-x-1/2 h-[2px] w-8 rounded-full bg-accent"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                  }}
                />
              )}
              <Icon
                size={20}
                className={isActive ? "text-accent" : "text-muted"}
              />
              <span
                className={`text-[10px] ${isActive ? "text-foreground" : "text-muted"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
