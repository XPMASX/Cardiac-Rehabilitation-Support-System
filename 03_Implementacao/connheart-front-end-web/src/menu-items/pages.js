// assets
import { ReactComponent as IconHome } from 'assets/images/icons/Branco/icon_home.svg';
import { ReactComponent as IconAdmin } from 'assets/images/icons/icon_admin.svg';
import { ReactComponent as IconUsers } from 'assets/images/icons/icon_users.svg';
import { ReactComponent as IconPlan } from 'assets/images/icons/icon_plan.svg';
import { ReactComponent as IconSchedule } from 'assets/images/icons/icon_schedule.svg';
import { ReactComponent as IconForm } from 'assets/images/icons/icon_forms.svg';

import { useState } from 'react';
// constant

import { IconHeart } from '@tabler/icons';

// Constant for icons
const icons = {
    IconHome,
    IconAdmin,
    IconUsers,
    IconPlan,
    IconSchedule,
    IconForm,
    IconHeart
};

const getMenuItemsForRole = (role) => {
    switch (role) {
        case 'DOCTOR':
            return [
                {
                    id: 'admin',
                    title: 'ADMINISTRAÇÃO',
                    key: 'pages.admin',
                    type: 'item',
                    icon: icons.IconAdmin,
                    url: '/admin',
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'utilizadores',
                    title: 'PACIENTES',
                    key: 'pages.utilizadores',
                    type: 'item',
                    icon: icons.IconUsers,
                    url: '/users',
                    breadcrumbs: false,
                    disabled: false
                },
                {
                    id: 'planos',
                    title: 'PLANOS',
                    key: 'pages.planos',
                    type: 'item',
                    icon: icons.IconPlan,
                    url: '/planos',
                    breadcrumbs: false,
                    disabled: false
                },
                {
                    id: 'questionarios',
                    title: 'QUESTIONÁRIOS',
                    key: 'pages.questionarios',
                    type: 'item',
                    icon: icons.IconForm,
                    url: '/questionarios',
                    breadcrumbs: false,
                    disabled: false
                },
                {
                    id: 'agenda',
                    title: 'AGENDA',
                    key: 'pages.agenda',
                    type: 'item',
                    icon: icons.IconSchedule,
                    url: '/agenda',
                    breadcrumbs: false,
                    disabled: true
                }
            ];
        case 'PATIENT':
            return [
                {
                    id: 'meu-coracao',
                    title: 'O MEU CORAÇÃO',
                    key: 'pages.meu-coracao',
                    type: 'item',
                    icon: icons.IconHeart,
                    url: '/clientSinais',
                    breadcrumbs: false
                },
                {
                    id: 'meu-plano',
                    title: 'O MEU PLANO',
                    key: 'pages.planos',
                    type: 'item',
                    icon: icons.IconPlan,
                    url: '/planos',
                    breadcrumbs: false
                },
                {
                    id: 'questionarios',
                    title: 'QUESTIONÁRIOS',
                    key: 'pages.questionarios',
                    type: 'item',
                    icon: icons.IconForm,
                    url: '/questionarios/paciente',
                    breadcrumbs: false
                },
                {
                    id: 'atividade',
                    title: 'ATIVIDADE',
                    key: 'pages.atividade',
                    type: 'item',
                    icon: icons.IconPlan,
                    url: '/atividade',
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'minha-clinica',
                    title: 'A MINHA CLINICA',
                    key: 'pages.minha-clinica',
                    type: 'item',
                    icon: icons.IconUsers,
                    url: '/minha-clinica',
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'conselhos',
                    title: 'CONSELHOS',
                    key: 'pages.conselhos',
                    type: 'item',
                    icon: icons.IconSchedule,
                    url: '/conselhos',
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'historico',
                    title: 'HISTÓRICO',
                    key: 'pages.historico',
                    type: 'item',
                    icon: icons.IconAdmin,
                    url: '/historico',
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'atualizar-dados',
                    title: 'ATUALIZAR DADOS',
                    key: 'pages.atualizar-dados',
                    type: 'item',
                    icon: icons.IconUsers,
                    url: '/atualizar-dados',
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'dispositivo',
                    title: 'DISPOSITIVO',
                    key: 'pages.dispositivo',
                    type: 'item',
                    icon: icons.IconForm,
                    url: '/dispositivo',
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'sintomas',
                    title: 'SINTOMAS',
                    key: 'pages.sintomas',
                    type: 'item',
                    icon: icons.IconSchedule,
                    url: '/sintomas',
                    breadcrumbs: false,
                    disabled: true
                },
                {
                    id: 'sos',
                    title: 'SOS',
                    key: 'pages.sos',
                    type: 'item',
                    icon: icons.IconSchedule,
                    url: '/sos',
                    breadcrumbs: false,
                    disabled: true
                }
            ];
        default:
            return [];
    }
};

export { getMenuItemsForRole, icons };
