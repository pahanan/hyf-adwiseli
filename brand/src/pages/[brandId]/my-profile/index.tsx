import Layout from '@/components/layout'
import MyProfileLayout from '@/components/organisms/MyProfile/MyProfileLayout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import withBrand from '@/hoc/with-brand'
import useUser from '@/hooks/use-user'
function ProfileSettings() {
	const { user } = useUser()
	return (
		<Layout active="my-profile" title="My profile">
			<MyProfileLayout>
				<div className="flex bg-white border p-4 rounded-lg flex-col gap-10">
					<div className="flex items-center gap-4">
						<div className="relative">
							<div className="rounded-full w-fit border shadow-sm">
								<Avatar className="size-12 border-2 border-white">
									<AvatarImage src={'/'} />
									<AvatarFallback />
								</Avatar>
							</div>
						</div>
						<h2 className="font-medium text-xl">
							{user?.user.firstName} {user?.user.lastName}
						</h2>
						<p onClick={() => {}}>sign out</p>
					</div>
				</div>
			</MyProfileLayout>
		</Layout>
	)
}

export default withBrand(ProfileSettings)
