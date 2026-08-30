import React from 'react';
import { OrgMemberCard } from './org-member-card';
import { OrganizationStructure } from '@/lib/types/company.type';
import { SectionEyebrow } from '@/components/shared';

export interface OrganizationTabContentProps {
  orgData: OrganizationStructure;
}

export function OrganizationTabContent({ orgData }: OrganizationTabContentProps) {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 animate-in fade-in duration-300">
      {/* 1. Board of Directors */}
      <div className="flex flex-col gap-6">
        <div>
          <SectionEyebrow>
            Kepemimpinan Eksekutif
          </SectionEyebrow>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Jajaran Direksi (Board of Directors)
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Manajemen puncak yang mengawal tata kelola perseroan, kepatuhan hukum, dan arah strategis pembangunan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {orgData.directors.map((dir) => (
            <OrgMemberCard
              key={dir.id}
              id={dir.id}
              name={dir.name}
              photoUrl={dir.photoUrl}
              position={dir.position}
              roleDescription={dir.roleDescription}
              imageHeightClassName="h-64"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ))}
        </div>
      </div>

      {/* 2. Operational Departments */}
      <div className="flex flex-col gap-6 pt-6 border-t border-dashed border-slate-200">
        <div>
          <SectionEyebrow>
            Pelaksana Operasional
          </SectionEyebrow>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Departemen Pelaksana Bisnis
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Divisi profesional yang mengelola perencanaan teknik, legalitas pertanahan, keuangan KPR, dan pelayanan pelanggan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {orgData.departments.map((dept) => (
            <OrgMemberCard
              key={dept.id}
              id={dept.id}
              name={dept.headName}
              photoUrl={dept.headPhotoUrl}
              position={dept.headPosition}
              departmentName={dept.name}
              roleDescription={dept.headRoleDescription}
              imageHeightClassName="h-60"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          ))}
        </div>
      </div>

      {/* 3. Site Teams & QC */}
      <div className="flex flex-col gap-6 pt-6 border-t border-dashed border-slate-200">
        <div>
          <SectionEyebrow>
            Pengawas & Pengendali Mutu
          </SectionEyebrow>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
            Site Construction & Quality Control
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Tim lapangan berdedikasi tinggi yang memastikan standar konstruksi fisik bangunan kokoh sesuai standar SNI.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl">
          {orgData.siteTeams.map((st) => (
            <OrgMemberCard
              key={st.id}
              id={st.id}
              name={st.name}
              photoUrl={st.photoUrl}
              position={st.position}
              roleDescription={st.roleDescription}
              imageHeightClassName="h-64"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

