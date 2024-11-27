import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const apkDirectory = path.join(process.cwd(), 'public', 'download', 'apk')
    const files = await fs.readdir(apkDirectory)
    
    const apkFiles = files.filter(file => file.endsWith('.apk'))
    
    if (apkFiles.length === 0) {
      return NextResponse.json({ error: 'Aucun fichier APK trouvé' }, { status: 404 })
    }
    
    const latestApk = apkFiles.sort().pop()
    const versionMatch = latestApk?.match(/(\d+\.\d+\.\d+)/)
    
    if (!versionMatch) {
      return NextResponse.json({ error: 'Version non trouvée' }, { status: 404 })
    }
    
    const version = versionMatch[1]
    
    return NextResponse.json({ version });
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier APK:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}