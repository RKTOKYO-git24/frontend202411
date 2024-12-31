'use client'

import { useEffect, useState} from 'react';
import axios from '../../../plugins/axios';
import {
    Alert,
    AlertColor,
    Box,
    Button,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input'
import { SettingsSystemDaydreamSharp } from '@mui/icons-material';

export default function Page() {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<AlertColor>('success');
    const [message, setMessage] = useState('');
    const result = (severity: AlertColor, message: string) => {
        setOpen(true);
        setSeverity(severity);
        setMessage(message);
    };

    const [fileSync, setFileSync] = useState()
    const onChargeFileSync =(newFile: any) => {
        setFileSync(newFile)
    }

    const doAddSync = ((e: any) => {
        if (!fileSync) {
            result('error', 'ファイルを選択してください')
            return
        }
        const params = {
            file: fileSync
        }
        axios.post('/api/inventory/sync', params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(function (response) {
                console.log(response)
                result('success', '同期ファイルが登録されました')
            })
            .catch(function (error) {
                console.log(error)
                result('error', '同期ファイルの登録に失敗しました')
            })
    })
    const handleClose = (event: any, reason: any) => {
        setOpen(false);
    };

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/api/inventory/summary')
        .then((res) => res.data)
        .then((data) => {
            setData(data)
        })
    }, [open])

    const [fileAsync, setFileAsync] = useState()

    const onChangeFileAsync = (newFile: any) => {
        setFileAsync(newFile)
    }

    const doAddASync = ((e: any) => {
if (!fileAsync) {
    result('error', 'ファイルを選択してください')
    return
}

const params = {
    file: fileAsync
}
axios.post('/api/inventory/async', params, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
    .then(function (response) {
        console.log(response)
        result('success', '非同期ファイルが登録されました')
    })
    .catch(function (error) {
        console.log(error)
        result('error', '非同期ファイルの登録に失敗しました')
    })
})

    return (
        <Box>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert severity={severity}>{message}</Alert>
            </Snackbar>
            <Typography variant="h5">売上一括登録</Typography>
            <Box m={2}>
                <Typography variant="subtitle1">同期でファイル取込</Typography>
                <MuiFileInput value={fileSync} onChange={onChargeFileSync} />
                <Button variant="contained" onClick={doAddSync}>登録</Button>
            </Box>
            <Box m={2}>
                <Typography variant="subtitle1">年月ごとの売上数集計</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>処理月</TableCell>
                                <TableCell>合計数量</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((data: any) => (
                                <TableRow key={data.monthly_date}>
                                    <TableCell>{data.monthly_date}</TableCell>
                                    <TableCell>{data.monthly_price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box m={2}>
                <Typography variant="subtitle1">非同期でファイル取込</Typography>
                <MuiFileInput value={fileAsync} onChange={onChangeFileAsync} />
                <Button variant='contained' onClick={doAddASync}>登録</Button>
            </Box>
        </Box>
    )
}